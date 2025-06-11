/* eslint-disable @next/next/no-img-element */

'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { toast } from 'react-toastify'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("Logged out successfully!", { autoClose: 2000 })
    setTimeout(() => router.push("/login"), 2000)
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/home" className="-m-1.5 p-1.5">
            <img alt="Logo" src="/logo.png" className="h-20 w-auto" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="/home" className="text-sm font-semibold text-gray-900">Home</Link>
          <Link href="/tours/list" className="text-sm font-semibold text-gray-900">All Tours</Link>
          <Link href="/tours/bookings" className="text-sm font-semibold text-gray-900">My Bookings</Link>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button onClick={handleLogout} className="text-sm font-semibold text-gray-900">
            Log out <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/home" className="-m-1.5 p-1.5">
              <img alt="Logo" src="/logo.png" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="space-y-2 py-6">
              <Link href="/home" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">Home</Link>
              <Link href="/tours/list" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">All Tours</Link>
              <Link href="/tours/bookings" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50">My Bookings</Link>
              <button
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="w-full text-left block px-3 py-2.5 rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                Log out
              </button>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

export default Header
