const BASE_URL = 'https://api.webapporbis.com';

const CREDENTIALS = {
  email: 'admin@webapporbis',
  password: '123'
};

let cachedToken: string | null = null;

export const authApi = {
  getToken: async () => {
    if (cachedToken) return cachedToken;
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('wo_admin_token');
      if (stored) {
        cachedToken = stored;
        return stored;
      }
    }

    const res = await fetch(`${BASE_URL}/User/GenerateToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: CREDENTIALS.email,
        Password: CREDENTIALS.password
      }),
    });
    
    if (!res.ok) {
      throw new Error(`Login failed: ${res.statusText}`);
    }
    
    const token = await res.text();
    cachedToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('wo_admin_token', token);
    }
    return token;
  },
  clearToken: () => {
    cachedToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wo_admin_token');
    }
  }
};

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  let token = await authApi.getToken();
  
  const makeRequest = async (t: string) => {
    const headers: any = {
      Authorization: `Bearer ${t}`,
      ...options.headers,
    };
    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    return fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  };

  let res = await makeRequest(token);
  
  // Retry once if token expired
  if (res.status === 401) {
    authApi.clearToken();
    token = await authApi.getToken();
    res = await makeRequest(token);
  }
  
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
          remarks: extraData.actualRemarks || ''
        };
      });
  },
  
  addOrUpdate: async (deal: any) => {
    const formData = new FormData();
    if (deal.id && !deal.id.toString().startsWith('d')) {
      formData.append('ID', deal.id.toString());
    }
    
    // Package extra UI fields into remarks
    const extraData = {
      project: deal.project,
      client: deal.client,
      total: deal.total,
      advance: deal.advance,
      due: deal.due,
      actualRemarks: deal.remarks
    };
    
    formData.append('Remarks', JSON.stringify(extraData));
    formData.append('LeadID', (deal.leadID || 0).toString());
    formData.append('GST', deal.gst || '');
    formData.append('ProjectType', deal.type || '');
    formData.append('Stage', deal.stage || '');
    formData.append('Status', deal.status || '');
    formData.append('Value', (deal.total || 0).toString());
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
        notes: item.notes || '',
        date: item.createdOn ? item.createdOn.split('T')[0] : '',
      }));
  },
  
  addOrUpdate: async (lead: any) => {
    const formData = new FormData();
    if (lead.id && !lead.id.toString().startsWith('l')) {
      formData.append('ID', lead.id.toString());
    }
    
    formData.append('ClientName', lead.company || '');
    formData.append('Company', lead.company || '');
    formData.append('Business', lead.business || '');
    formData.append('ContactPerson', lead.contact || '');
    formData.append('Email', lead.email || '');
    formData.append('Phone', lead.phone || '');
    formData.append('ServiceRequested', lead.service || '');
    formData.append('Requirement', lead.service || '');
    formData.append('Source', lead.source || '');
    formData.append('Budget', (lead.budget || '').toString());
    formData.append('Status', lead.status || '');
    formData.append('Notes', lead.notes || '');
    formData.append('IsActive', 'true');

    const res = await fetchWithAuth(`/User/AddOrUpdateLeads`, {
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
    if (renewal.id && !renewal.id.toString().startsWith('r')) {
      formData.append('ID', renewal.id.toString());
    }
    
    formData.append('CompanyName', renewal.company || '');
    formData.append('ClientName', renewal.client || '');
    formData.append('DomainName', renewal.domain || '');
    formData.append('ServiceType', renewal.service || '');
    formData.append('DomainProvider', renewal.domainProvider || '');
    formData.append('ServerProvider', renewal.serverProvider || '');
    formData.append('PlanName', renewal.plan || '');
    formData.append('BillingCycle', renewal.billing || '');
    formData.append('StartDate', renewal.start || '');
    formData.append('ExpiryDate', renewal.expiry || '');
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
    const res = await fetchWithAuth(`/User/User/DeleteRenewals?ID=${id}`, {
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
