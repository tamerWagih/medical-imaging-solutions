"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Activity, ChevronDown, Menu, X } from "lucide-react";
import { NAV_ITEMS, COMPANY } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
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
                    setDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setDropdownOpen(false);
                    }, 800);
                  }}
                >
                  <button className="medical-nav-link">
                    {item.label}
                    <ChevronDown size={16} />
                  </button>
                  <div
                    className="medical-dropdown"
                    style={{
                      opacity: dropdownOpen ? 1 : 0,
                      visibility: dropdownOpen ? 'visible' : 'hidden',
                      transform: dropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
                    }}
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current) {
                        clearTimeout(dropdownTimeoutRef.current);
                      }
                    }}
                    onMouseLeave={() => {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setDropdownOpen(false);
                      }, 300);
                    }}
                  >
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="medical-dropdown-item"
                        onClick={() => {
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                          }
                          setDropdownOpen(false);
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
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    >
                      {item.label}
                      <ChevronDown size={16} />
                    </div>
                    <div className={`medical-mobile-dropdown ${mobileDropdownOpen ? "open" : ""}`}>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
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
