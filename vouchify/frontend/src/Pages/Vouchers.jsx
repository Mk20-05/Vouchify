import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useVouchers } from '../Contexts/VoucherContext';
import {
  TicketIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  ArchiveBoxXMarkIcon,
  ArrowPathIcon,
  FunnelIcon,
  ListBulletIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FireIcon, // Replaces RestaurantIcon
  MapIcon,
  FilmIcon,
  ShoppingCartIcon,
  HeartIcon,
  WrenchScrewdriverIcon,
  TagIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarDaysIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const Vouchers = () => {
  const { vouchers, deleteVoucher } = useVouchers();
  const [loading] = useState(false);
  const [error] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const categories = useMemo(() => [
    'All',
    'Food & Dining',
    'Travel & Hotel',
    'Entertainment',
    'Groceries',
    'Health & Beauty',
    'Services',
    'Other',
  ], []);

  const filteredVouchers = useMemo(() => {
    const categoryFiltered = selectedCategory === 'All'
      ? vouchers
      : vouchers.filter(v => v.category === selectedCategory);

    if (!searchTerm) return categoryFiltered;

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return categoryFiltered.filter(voucher => (
      voucher.name.toLowerCase().includes(lowercasedSearchTerm) ||
      voucher.description.toLowerCase().includes(lowercasedSearchTerm) ||
      voucher.seller.toLowerCase().includes(lowercasedSearchTerm) ||
      voucher.category.toLowerCase().includes(lowercasedSearchTerm)
    ));
  }, [selectedCategory, vouchers, searchTerm]);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the voucher "${name}"?`)) {
      deleteVoucher(id);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food & Dining':
        return <FireIcon className="h-4 w-4 mr-1.5" />;
      case 'Travel & Hotel':
        return <MapIcon className="h-4 w-4 mr-1.5" />;
      case 'Entertainment':
        return <FilmIcon className="h-4 w-4 mr-1.5" />;
      case 'Groceries':
        return <ShoppingCartIcon className="h-4 w-4 mr-1.5" />;
      case 'Health & Beauty':
        return <HeartIcon className="h-4 w-4 mr-1.5" />;
      case 'Services':
        return <WrenchScrewdriverIcon className="h-4 w-4 mr-1.5" />;
      case 'Other':
        return <TagIcon className="h-4 w-4 mr-1.5" />;
      case 'All':
        return <ListBulletIcon className="h-4 w-4 mr-1.5" />;
      default:
        return <TagIcon className="h-4 w-4 mr-1.5" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <TicketIcon className="h-12 w-12 mx-auto text-green-600 mb-2" />
          <h1 className="text-4xl font-extrabold text-gray-800">Available Vouchers</h1>
          <p className="mt-2 text-lg text-gray-600">Find deals shared by other users</p>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search vouchers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-12 bg-white p-4 rounded-lg shadow">
          <button
            className="flex items-center mb-3 text-gray-700 font-semibold"
            onClick={() => setShowCategories(!showCategories)}
          >
            <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
            Filter by Category
            {showCategories ? (
              <ChevronUpIcon className="h-5 w-5 ml-2" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 ml-2" />
            )}
          </button>

          {showCategories && (
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition duration-200 flex items-center ${
                    selectedCategory === category
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {getCategoryIcon(category)} {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center py-10">
            <ArrowPathIcon className="h-8 w-8 mx-auto text-blue-500 animate-spin mb-3" />
            <p className="text-center text-gray-600 text-xl">Loading vouchers...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-10 max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
            <ExclamationTriangleIcon className="h-10 w-10 mx-auto text-red-500 mb-3" />
            <p className="text-center text-red-700 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && filteredVouchers.length === 0 && (
          <div className="text-center py-10 max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ArchiveBoxXMarkIcon className="h-10 w-10 mx-auto text-blue-500 mb-3" />
            <p className="text-center text-gray-600 text-xl">
              No vouchers found {selectedCategory !== 'All' ? `in the "${selectedCategory}" category` : 'matching your criteria'}
              {searchTerm && ` matching "${searchTerm}"`}.
            </p>
            {selectedCategory !== 'All' && (
              <button onClick={() => setSelectedCategory('All')} className="mt-4 text-sm text-blue-600 hover:underline">
                Show All Categories
              </button>
            )}
            <p className="text-sm text-gray-500 mt-2">Check back soon or list your own!</p>
            <Link to="/list-voucher" className="mt-2 inline-block text-blue-600 hover:underline">
              List a Voucher
            </Link>
          </div>
        )}

        {!loading && !error && filteredVouchers.length > 0 && (
          <>
            <p className="text-sm text-gray-500 mb-4 text-center md:text-left">
              Showing {filteredVouchers.length} voucher{filteredVouchers.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVouchers.map(voucher => (
                <div key={voucher.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50 flex flex-col transform transition duration-300 hover:shadow-2xl hover:-translate-y-1.5">
                  <div className="flex items-center p-4 bg-gray-50 border-b border-gray-200">
                    {voucher.brandLogo && (
                      <img src={voucher.brandLogo} alt={`${voucher.name} logo`} className="w-10 h-10 object-contain mr-3 flex-shrink-0 rounded-sm" />
                    )}
                    <div className="flex-grow min-w-0">
                      <h2 className="text-base font-semibold text-gray-800 truncate leading-tight" title={voucher.name}>
                        {voucher.name}
                      </h2>
                      <div className="flex items-center mt-1">
                        <TagIcon className="h-3.5 w-3.5 text-blue-500 mr-1" />
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {voucher.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-gray-600 mb-4 text-sm flex-grow">{voucher.description}</p>
                    <div className="text-xs text-gray-500 mb-5 space-y-1.5">
                      <div className="flex items-center">
                        <CalendarDaysIcon className="h-4 w-4 mr-1.5 text-red-500 flex-shrink-0" />
                        <span>Expires: <span className="font-medium text-red-600">{voucher.expiry}</span></span>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-1.5 text-gray-400 flex-shrink-0" />
                        <span>Listed By: <span className="font-medium text-gray-700">{voucher.seller}</span></span>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center">
                      <p className="text-xl font-bold text-green-700">₹{voucher.price}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(voucher.id, voucher.name)}
                          className="inline-flex items-center bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-red-200 transition duration-300"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                        </button>
                        <Link to={`/vouchers/${voucher.id}`} className="inline-flex items-center bg-green-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-green-700 transition duration-300">
                          View Offer <ArrowRightIcon className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="text-center mt-16">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition duration-300">
            <ArrowLeftIcon className="h-4 w-4 mr-1.5" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vouchers;
