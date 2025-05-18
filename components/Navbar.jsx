// components/Navbar.jsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { PhotoIcon, ArrowsUpDownIcon, DocumentIcon, Bars3Icon, XMarkIcon, DocumentTextIcon, ArrowsPointingInIcon } from '@heroicons/react/24/outline';
import CustomLink from './CustomLink';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const menuGroups = [
    {
      name: 'Image Conversion',
      icon: <PhotoIcon className="w-5 h-5 mr-2" />,
      items: [
        { name: 'JPG to PDF', href: '/jpg-to-pdf' },
        { name: 'Bitmap to JPG', href: '/bitmap-to-jpg' },
        { name: 'HEIC to JPG', href: '/heic-to-jpg' },
      ],
    },
    {
      name: 'Compression & Optimization',
      icon: <ArrowsPointingInIcon className="w-5 h-5 mr-2" />,
      items: [
        { name: 'JPG Compressor', href: '/jpg-compressor' },
        { name: 'PDF Compressor', href: '/pdf-compressor' },
      ],
    },
    {
      name: 'PDF Tools',
      icon: <DocumentIcon className="w-5 h-5 mr-2" />,
      items: [
        { name: 'PDF Join', href: '/pdf-join' },
      ],
    },
    {
      name: 'Text Extraction',
      icon: <DocumentTextIcon className="w-5 h-5 mr-2" />,
      items: [
        { name: 'OCR Text Extraction', href: '/ocr' },
      ],
    },
  ];

  return (
    <nav className="bg-sky-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <CustomLink href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} priority />
          <span className="ml-2 text-xl font-bold">Legend File Utility Tools</span>
        </CustomLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {menuGroups.map((group) => (
            <div key={group.name} className="relative group">
              <button
                className="flex items-center py-2 px-3 rounded-md hover:bg-sky-700 focus:outline-none focus:bg-sky-700"
                onClick={() => toggleDropdown(group.name)}
              >
                {group.icon}
                {group.name}
              </button>
              <div
                className="absolute left-0 top-full w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 ease-in-out z-10"
                style={{ transform: 'translateY(0)' }}
              >
                <div className="py-2">
                  {group.items.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm hover:bg-sky-100 rounded-md"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.name}
                    </CustomLink>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-sky-700 px-4 py-2">
          {menuGroups.map((group) => (
            <div key={group.name} className="border-b border-sky-600 last:border-b-0">
              <button
                className="flex items-center w-full text-left py-2 hover:bg-sky-800 focus:outline-none"
                onClick={() => toggleDropdown(group.name)}
              >
                {group.icon}
                {group.name}
              </button>
              {openDropdown === group.name && (
                <div className="pl-4 pb-2">
                  {group.items.map((item) => (
                    <CustomLink
                      key={item.name}
                      href={item.href}
                      className="block py-2 text-sm hover:bg-sky-800"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </CustomLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}