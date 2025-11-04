"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Activity, ChevronDown, Menu, X } from "lucide-react";
import { NAV_ITEMS, COMPANY } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="medical-header">
      <nav className="medical-nav-container">
        <div className="medical-nav-inner">
          {/* Logo */}
          <Link href="/" className="medical-logo-link">
            <div className="medical-logo-icon">
              <Activity size={24} />
            </div>
            <div className="medical-logo-text">
              <span className="medical-logo-title">{COMPANY.name}</span>
              <span className="medical-logo-tagline">{COMPANY.tagline}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="medical-desktop-nav">
            {NAV_ITEMS.map((item) =>
              item.items ? (
                <div
                  key={item.label}
                  className="medical-nav-item"
                  onMouseEnter={() => {
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                    }
                    setOpenDropdown(item.label);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setOpenDropdown(null);
                    }, 800);
                  }}
                >
                  <button
                    className="medical-nav-link"
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === item.label}
                    aria-label={`${item.label} menu`}
                  >
                    {item.label}
                    <ChevronDown size={16} />
                  </button>
                  <div
                    className="medical-dropdown"
                    role="menu"
                    style={{
                      opacity: openDropdown === item.label ? 1 : 0,
                      visibility: openDropdown === item.label ? 'visible' : 'hidden',
                      transform: openDropdown === item.label ? 'translateY(0)' : 'translateY(-10px)',
                    }}
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current) {
                        clearTimeout(dropdownTimeoutRef.current);
                      }
                      setOpenDropdown(item.label);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setOpenDropdown(null);
                      }, 300);
                    }}
                  >
                    {item.items.map((subItem) => (
                      <Link
                        key={`${item.label}-${subItem.label}`}
                        href={subItem.href}
                        className="medical-dropdown-item"
                        role="menuitem"
                        onClick={() => {
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                          }
                          setOpenDropdown(null);
                        }}
                      >
                        <div className="medical-dropdown-item-content">
                          <div className="medical-dropdown-item-label">{subItem.label}</div>
                          {'description' in subItem && subItem.description && (
                            <div className="medical-dropdown-item-description">{subItem.description}</div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href!} className="medical-nav-link">
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="medical-mobile-menu-button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`medical-mobile-menu ${mobileMenuOpen ? "open" : "closed"}`}>
          <div className="medical-mobile-menu-content">
            <div className="medical-mobile-nav-items">
              {NAV_ITEMS.map((item) =>
                item.items ? (
                  <div key={item.label} className="medical-mobile-nav-group">
                    <div
                      className="medical-mobile-nav-title"
                      onClick={() =>
                        setMobileOpenDropdown((prev) => (prev === item.label ? null : item.label))
                      }
                    >
                      {item.label}
                      <ChevronDown size={16} />
                    </div>
                    <div className={`medical-mobile-dropdown ${mobileOpenDropdown === item.label ? "open" : ""}`}>
                      {item.items.map((subItem) => (
                        <Link
                          key={`${item.label}-${subItem.label}`}
                          href={subItem.href}
                          className="medical-mobile-dropdown-item"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="medical-mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
