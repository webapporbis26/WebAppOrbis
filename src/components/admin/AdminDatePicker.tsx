import { useState, useMemo } from "react";
import { CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const FULL_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function buildYearRange() {
  const years: number[] = [];
  for (let y = 2040; y >= 1970; y--) years.push(y);
  return years;
}

function validateDate(val: string): { valid: boolean; error: string } {
  if (!val) return { valid: true, error: "" }; // empty is OK (not required here)
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(val)) return { valid: false, error: "Format must be YYYY-MM-DD (e.g. 2026-06-15)" };
  const [y, m, d] = val.split("-").map(Number);
  if (y < 1970 || y > 2100) return { valid: false, error: "Year must be between 1970 and 2100" };
  if (m < 1 || m > 12) return { valid: false, error: "Month must be between 01 and 12" };
  const maxDay = daysInMonth(y, m - 1);
  if (d < 1 || d > maxDay) return { valid: false, error: `Day must be between 01 and ${maxDay} for this month` };
  return { valid: true, error: "" };
}

interface Props {
  value: string; // YYYY-MM-DD
  onChange: (val: string) => void;
  id?: string;
}

export function AdminDatePicker({ value, onChange, id }: Props) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);

  const { valid, error } = useMemo(() => validateDate(value), [value]);

  // Parse current value or default to today
  const parsed = value && valid ? new Date(value) : null;
  const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? today.getMonth());

  const YEARS = buildYearRange();

  function selectDate(day: number) {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    onChange(`${viewYear}-${mm}-${dd}`);
    setTouched(true);
    setOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const total = daysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const selectedDay = parsed && parsed.getFullYear() === viewYear && parsed.getMonth() === viewMonth
    ? parsed.getDate() : null;
  const todayDay = today.getFullYear() === viewYear && today.getMonth() === viewMonth
    ? today.getDate() : null;

  const showError = touched && !valid && value.length > 0;
  const showValid = touched && valid && value.length > 0;

  return (
    <div className="space-y-1">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Input
            id={id}
            type="text"
            placeholder="YYYY-MM-DD"
            value={value ?? ""}
            onChange={(e) => { setTouched(true); onChange(e.target.value); }}
            onBlur={() => setTouched(true)}
            className={`flex-1 pr-8 transition-colors ${
              showError ? "border-rose-400 focus-visible:ring-rose-400/40" :
              showValid ? "border-emerald-400 focus-visible:ring-emerald-400/40" : ""
            }`}
          />
          {showError && (
            <AlertCircle className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-rose-500 pointer-events-none" />
          )}
          {showValid && (
            <CheckCircle2 className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500 pointer-events-none" />
          )}
        </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" size="icon" className="shrink-0" title="Pick date">
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-3" align="end" sideOffset={4}>
          {/* Header: prev | Month dropdown | Year dropdown | next */}
          <div className="flex items-center gap-1 mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Month select */}
            <select
              value={viewMonth}
              onChange={(e) => setViewMonth(Number(e.target.value))}
              className="flex-1 h-7 rounded-md border border-border bg-background px-1.5 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {FULL_MONTHS.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>

            {/* Year select */}
            <select
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
              className="w-20 h-7 rounded-md border border-border bg-background px-1.5 text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={nextMonth}
              className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-1">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <div key={d} className="h-7 flex items-center justify-center text-[11px] font-medium text-muted-foreground">
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-px">
            {/* Empty cells for first week offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}
            {Array.from({ length: total }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDay === day;
              const isToday = todayDay === day;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDate(day)}
                  className={`h-8 w-full rounded-md text-xs font-medium transition-colors
                    ${isSelected
                      ? "bg-primary text-primary-foreground"
                      : isToday
                      ? "border border-primary text-primary"
                      : "hover:bg-muted text-foreground"
                    }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Today shortcut */}
          <div className="mt-2 pt-2 border-t border-border">
            <button
              type="button"
              onClick={() => {
                const t = new Date();
                setViewYear(t.getFullYear());
                setViewMonth(t.getMonth());
                const mm = String(t.getMonth() + 1).padStart(2, "0");
                const dd = String(t.getDate()).padStart(2, "0");
                onChange(`${t.getFullYear()}-${mm}-${dd}`);
                setOpen(false);
              }}
              className="w-full text-center text-xs text-primary hover:underline font-medium"
            >
              Today
            </button>
          </div>
        </PopoverContent>
      </Popover>
      </div>
      {/* Validation message */}
      {showError && (
        <p className="flex items-center gap-1 text-xs text-rose-500 font-medium">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
      {showValid && (
        <p className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <CheckCircle2 className="h-3 w-3 shrink-0" />
          Valid date
        </p>
      )}
    </div>
  );
}
