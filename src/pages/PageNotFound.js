import React from 'react'
import PageTransition from '../components/PageTransition'

export default function PageNotFound() {
  return (
    <PageTransition>
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Oops! Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
            It's okay! We're sorry, but the page you're looking for doesn't exist. It might have been removed or is temporarily unavailable.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="#" className="text-base font-semibold text-gray-900 hover:text-indigo-600">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
      </PageTransition>
  )
}
