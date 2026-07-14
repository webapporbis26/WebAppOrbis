const BASE_URL = 'https://api.webapporbis.com';

let cachedToken: string | null = null;

export const authApi = {
  login: async (email: string, password: string) => {
    let mappedEmail = email.trim();
    // The backend stringently requires 'admin@webapporbis' without the .com
    // We map common UI inputs back to this backend username.
    const normalized = mappedEmail.toLowerCase();
    if (normalized === 'admin@weborbis.com' || normalized === 'admin@webapporbis.com' || normalized === 'admin@weborbis') {
      mappedEmail = 'admin@webapporbis';
    }
    
    const res = await fetch(`${BASE_URL}/User/GenerateToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: mappedEmail,
        Password: password
      }),
    });
    
    if (!res.ok) {
      throw new Error(`Login failed: ${res.statusText}`);
    }
    
    const rawToken = await res.text();
    const token = rawToken.replace(/^"|"$/g, '').trim();
    cachedToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('wo_admin_token', token);
    }
    return token;
  },
  getToken: async () => {
    if (cachedToken) return cachedToken.replace(/^"|"$/g, '');
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wo_admin_token');
      if (stored) {
        const cleanToken = stored.replace(/^"|"$/g, '').trim();
        cachedToken = cleanToken;
        return cleanToken;
      }
    }
    throw new Error('No authentication token found. Please log in.');
  },
  getTokenOptional: () => {
    if (cachedToken) return cachedToken.replace(/^"|"$/g, '');
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wo_admin_token');
      if (stored) {
        return stored.replace(/^"|"$/g, '').trim();
      }
    }
    return null;
  },
  clearToken: () => {
    cachedToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wo_admin_token');
    }
  }
};

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = await authApi.getToken();
  
  const headers: any = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  
  if (res.status === 401) {
    authApi.clearToken();
    // Setting this key to empty string to trigger logout in auth.ts listener
    if (typeof window !== 'undefined') localStorage.removeItem('weborbis_admin_auth');
    throw new Error('Session expired');
  }
  
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res;
};

const fetchOptionalAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = authApi.getTokenOptional();
  
  const headers: any = {
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  
  if (res.status === 401 && token) {
    authApi.clearToken();
    if (typeof window !== 'undefined') localStorage.removeItem('weborbis_admin_auth');
    throw new Error('Session expired');
  }
  
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res;
};

const fetchWithoutAuth = async (endpoint: string, options: RequestInit = {}) => {
  const headers: any = {
    ...options.headers,
  };
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res;
};

export const dealsApi = {
  getAll: async () => {
    const res = await fetchWithAuth(`/User/GetAllDeals`);
    const data = await res.json();
    
    return data
      .filter((item: any) => item.isActive !== false)
      .map((item: any) => {
        let extraData: any = {};
        try {
          if (item.remarks && item.remarks.startsWith('{')) {
            extraData = JSON.parse(item.remarks);
          }
        } catch (e) {
          extraData.remarks = item.remarks;
        }

        return {
          id: item.id.toString(),
          leadID: item.leadID || 0,
          gst: item.gst || '',
          project: extraData.project || 'Unknown Project',
          client: extraData.client || 'Unknown Client',
          type: item.projectType || 'Static Website',
          total: extraData.total || item.value || 0,
          advance: extraData.advance || 0,
          stage: item.stage || 'New Deal',
          status: item.status || 'In Progress',
          due: extraData.due || '',
          address: item.address || '',
          quotationDocumentUrl: item.quotationDocumentURL || item.QuotationDocumentURL || '',
          remarks: extraData.actualRemarks || ''
        };
      });
  },
  
  addOrUpdate: async (deal: any) => {
    const formData = new FormData();
    const isNew = !deal.id || deal.id.toString().startsWith('d');
    formData.append('ID', isNew ? '0' : deal.id.toString());
    
    const toISO = (d: string) => d ? new Date(d).toISOString() : '';

    // Package extra UI fields into remarks
    const extraData = {
      project: deal.project,
      client: deal.client,
      total: deal.total,
      advance: deal.advance,
      due: toISO(deal.due),
      actualRemarks: deal.remarks
    };
    
    formData.append('Remarks', JSON.stringify(extraData));
    formData.append('LeadID', (deal.leadID || 0).toString());
    formData.append('GST', deal.gst || '');
    formData.append('ProjectType', deal.type || '');
    formData.append('Stage', deal.stage || '');
    formData.append('Status', deal.status || '');
    formData.append('Value', (deal.total || 0).toString());
    formData.append('Address', deal.address || '');
    formData.append('QuotationDocumentURL', deal.quotationDocumentUrl || '');
    formData.append('CreatedOn', new Date().toISOString());
    formData.append('IsActive', 'true');

    const res = await fetchWithAuth(`/User/AddOrUpdateDeals`, {
      method: 'POST',
      body: formData,
    });
    return res.text();
  },
  
  delete: async (id: string | number) => {
    const res = await fetchWithAuth(`/User/DeleteDeals?ID=${id}`, {
      method: 'POST',
    });
    return res.text();
  }
};

export const leadsApi = {
  getAll: async () => {
    const res = await fetchWithAuth(`/User/GetAllLeads`);
    const data = await res.json();
    
    return data
      .filter((item: any) => item.isActive !== false)
      .map((item: any) => ({
        id: item.id.toString(),
        company: item.clientName || item.company || '',
        business: item.business || '',
        contact: item.contactPerson || '',
        email: item.email || '',
        phone: item.phone || '',
        service: item.serviceRequested || item.requirement || 'Static Website Development',
        source: item.source || '',
        budget: item.budget || '',
        status: item.status || 'New',
        address: item.address || '',
        quotationDocumentUrl: item.quotationDocumentURL || item.QuotationDocumentURL || '',
        notes: item.notes || '',
        date: item.createdOn ? item.createdOn.split('T')[0] : '',
      }));
  },
  
  addOrUpdate: async (lead: any) => {
    const formData = new FormData();
    const isNew = !lead.id || lead.id.toString().startsWith('l');
    formData.append('ID', isNew ? '0' : lead.id.toString());
    
    formData.append('ClientName', lead.company || '');
    formData.append('Company', lead.company || '');
    formData.append('Business', lead.business || '');
    formData.append('ContactPerson', lead.contact || '');
    formData.append('Email', lead.email || '');
    formData.append('Phone', lead.phone || '');
    formData.append('ServiceRequested', lead.service || '');
    formData.append('Requirement', lead.service || '');
    formData.append('Source', lead.source || '');
    formData.append('Budget', (lead.budget || 0).toString());
    formData.append('Status', lead.status || 'New');
    formData.append('Address', lead.address || '');
    formData.append('QuotationDocumentURL', lead.quotationDocumentUrl || '');
    formData.append('Notes', lead.notes || '');
    formData.append('CreatedOn', new Date().toISOString());
    formData.append('IsActive', 'true');

    const res = await fetchOptionalAuth(`/User/AddOrUpdateLeads`, {
      method: 'POST',
      body: formData,
    });
    return res.text();
  },
  
  delete: async (id: string | number) => {
    const res = await fetchWithAuth(`/User/DeleteLeads?ID=${id}`, {
      method: 'POST',
    });
    return res.text();
  }
};

export const renewalsApi = {
  getAll: async () => {
    const res = await fetchWithAuth(`/User/GetAllRenewals`);
    const data = await res.json();
    
    return data
      .filter((item: any) => item.isActive !== false)
      .map((item: any) => ({
        id: item.id.toString(),
        company: item.companyName || '',
        client: item.clientName || '',
        domain: item.domainName || '',
        service: item.serviceType || 'Domain',
        domainProvider: item.domainProvider || '',
        serverProvider: item.serverProvider || '',
        plan: item.planName || '',
        billing: item.billingCycle || 'Yearly',
        start: item.startDate ? item.startDate.split('T')[0] : '',
        expiry: item.expiryDate ? item.expiryDate.split('T')[0] : '',
        amount: item.amount || 0,
        reminder: item.reminderStage || 'Active',
        payment: item.paymentStatus || 'Pending',
        notes: item.notes || ''
      }));
  },
  
  addOrUpdate: async (renewal: any) => {
    const formData = new FormData();
    const isNew = !renewal.id || renewal.id.toString().startsWith('r');
    formData.append('ID', isNew ? '0' : renewal.id.toString());

    const toISO = (d: string) => d ? new Date(d).toISOString() : '';
    
    formData.append('CompanyName', renewal.company || '');
    formData.append('ClientName', renewal.client || '');
    formData.append('DomainName', renewal.domain || '');
    formData.append('ServiceType', renewal.service || '');
    formData.append('DomainProvider', renewal.domainProvider || '');
    formData.append('ServerProvider', renewal.serverProvider || '');
    formData.append('PlanName', renewal.plan || '');
    formData.append('BillingCycle', renewal.billing || '');
    formData.append('StartDate', toISO(renewal.start));
    formData.append('ExpiryDate', toISO(renewal.expiry));
    formData.append('Amount', (renewal.amount || 0).toString());
    formData.append('ReminderStage', renewal.reminder || '');
    formData.append('PaymentStatus', renewal.payment || '');
    formData.append('Notes', renewal.notes || '');
    formData.append('AmountPaid', '0');
    formData.append('CreatedOn', new Date().toISOString());
    formData.append('IsActive', 'true');

    const res = await fetchWithAuth(`/User/AddOrUpdateRenewal`, {
      method: 'POST',
      body: formData,
    });
    return res.text();
  },
  
  delete: async (id: string | number) => {
    const res = await fetchWithAuth(`/User/DeleteRenewals?ID=${id}`, {
      method: 'POST',
    });
    return res.text();
  }
};

export const contentApi = {
  getAll: async () => {
    // Using a default category since the endpoint requires one
    const res = await fetchWithAuth(`/User/GetAllPageContent?CategoryName=Website`);
    if (!res.ok) return [];
    
    const data = await res.json();
    return data
      .filter((item: any) => item.isActive !== false)
      .map((item: any) => ({
        id: item.id.toString(),
        module: item.module || item.categoryName || '',
        description: item.description || item.contentText || '',
        status: item.status || 'Published',
        updated: item.updatedOn ? item.updatedOn.split('T')[0] : '',
      }));
  },
  
  addOrUpdate: async (content: any) => {
    const formData = new FormData();
    if (content.id && !content.id.toString().startsWith('c')) {
      formData.append('ID', content.id.toString());
    }
    
    formData.append('CategoryName', content.module || 'Website');
    formData.append('ContentText', content.description || '');
    formData.append('Status', content.status || 'Published');
    formData.append('IsActive', 'true');

    const res = await fetchWithAuth(`/User/AddOrUpdatePageContent`, {
      method: 'POST',
      body: formData,
    });
    return res.text();
  },
  
  delete: async (id: string | number) => {
    const res = await fetchWithAuth(`/User/DeletePageContent`, {
      method: 'POST',
      body: JSON.stringify({ ID: Number(id) })
    });
    return res.text();
  }
};

export const employeesApi = {
  getAll: async () => {
    const res = await fetchWithAuth(`/User/GetAllEmployees`);
    if (!res.ok) return [];
    
    const data = await res.json();
    return data
      .filter((item: any) => item.isActive !== false)
      .map((item: any) => ({
        id: item.id.toString(),
        name: item.employeeName || '',
        gender: item.gender || '',
        dob: item.dateOfBirth ? item.dateOfBirth.split('T')[0] : '',
        address: item.address || '',
        mobile: item.mobileNumber || '',
        email: item.emailID || '',
        department: item.department || '',
        designation: item.designation || '',
        skills: item.skillset || '',
        experience: item.experience || '',
        qualification: item.qualification || '',
        doj: item.dateOfJoining ? item.dateOfJoining.split('T')[0] : '',
        status: item.status || 'Active'
      }));
  },
  
  addOrUpdate: async (employee: any) => {
    const formData = new FormData();

    // ID: 0 for new, numeric ID for existing
    const isNew = !employee.id || employee.id.toString().startsWith('e');
    formData.append('ID', isNew ? '0' : employee.id.toString());

    // Helper: convert YYYY-MM-DD to ISO datetime string
    const toISO = (d: string) => d ? new Date(d).toISOString() : '';

    formData.append('EmployeeName', employee.name || '');
    formData.append('Gender', employee.gender || '');
    formData.append('DateOfBirth', toISO(employee.dob));
    formData.append('Address', employee.address || '');
    formData.append('MobileNumber', employee.mobile || '');
    formData.append('EmailID', employee.email || '');
    formData.append('Department', employee.department || '');
    formData.append('Designation', employee.designation || '');
    formData.append('Skillset', employee.skills || '');
    formData.append('Experience', (employee.experience || 0).toString());
    formData.append('Qualification', employee.qualification || '');
    formData.append('DateOfJoining', toISO(employee.doj));
    formData.append('Status', employee.status || 'Active');
    formData.append('CreatedOn', new Date().toISOString());
    formData.append('IsActive', 'true');

    const res = await fetchWithAuth(`/User/AddOrUpdateEmployees`, {
      method: 'POST',
      body: formData,
    });
    return res.text();
  },
  
  delete: async (id: string | number) => {
    const res = await fetchWithAuth(`/User/DeleteEmployees?ID=${id}`, {
      method: 'POST',
    });
    return res.text();
  }
};

