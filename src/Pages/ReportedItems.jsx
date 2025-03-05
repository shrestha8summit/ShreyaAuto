"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Calendar,
  MapPin,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Eye,
  Package,
  X,
  RefreshCw,
} from "lucide-react"

const ReportedItems = () => {
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const itemsPerPage = 6

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockItems = [
        {
          id: "LF-1001",
          itemName: "MacBook Pro Laptop",
          itemImage: "/placeholder.svg?height=200&width=300",
          category: "Electronics",
          reportType: "lost",
          reportDate: "2024-03-10",
          location: "Library, Pragati Marga",
          description: "Silver MacBook Pro 13-inch with stickers on the lid. Last seen in the library study area.",
          status: "active",
          contactPhone: "+977 9812345678",
        },
        {
          id: "LF-1002",
          itemName: "Car Keys with Remote",
          itemImage: "/placeholder.svg?height=200&width=300",
          category: "Personal Items",
          reportType: "found",
          reportDate: "2024-03-05",
          location: "Parking Lot, Pragati Marga",
          description:
            "Honda car keys with black remote and a small keychain. Found near the main entrance of the parking lot.",
          status: "active",
          contactPhone: "+977 9812345678",
        },
        {
          id: "LF-1003",
          itemName: "Blue Wallet",
          itemImage: "/placeholder.svg?height=200&width=300",
          category: "Personal Items",
          reportType: "lost",
          reportDate: "2024-02-28",
          location: "Cafeteria, Pragati Marga",
          description: "Navy blue leather wallet containing ID cards and some cash. Lost during lunch time.",
          status: "resolved",
          contactPhone: "+977 9812345678",
        },
        {
          id: "LF-1004",
          itemName: "iPhone 13 Pro",
          itemImage: "/placeholder.svg?height=200&width=300",
          category: "Electronics",
          reportType: "found",
          reportDate: "2024-03-12",
          location: "Test Drive Area, Pragati Marga",
          description: "Black iPhone 13 Pro with clear case. Found on the bench near the test drive area.",
          status: "active",
          contactPhone: "+977 9812345678",
        },
        {
          id: "LF-1005",
          itemName: "Prescription Glasses",
          itemImage: "/placeholder.svg?height=200&width=300",
          category: "Accessories",
          reportType: "lost",
          reportDate: "2024-03-08",
          location: "Customer Lounge, Pragati Marga",
          description: "Black-framed prescription glasses in a brown case. Needed urgently.",
          status: "active",
          contactPhone: "+977 9812345678",
        },
        {
          id: "LF-1006",
          itemName: "Wristwatch",
          itemImage: "/placeholder.svg?height=200&width=300",
          category: "Accessories",
          reportType: "found",
          reportDate: "2024-02-20",
          location: "Washroom, Pragati Marga",
          description: "Silver analog wristwatch with leather strap. Found in the men's washroom.",
          status: "resolved",
          contactPhone: "+977 9812345678",
        },
        {
          id: "LF-1007",
          itemName: "Backpack",
          itemImage: "/placeholder.svg?height=200&width=300",
          category: "Bags",
          reportType: "lost",
          reportDate: "2024-03-15",
          location: "Reception Area, Pragati Marga",
          description: "Black North Face backpack containing textbooks and a water bottle.",
          status: "active",
          contactPhone: "+977 9812345678",
        },
      ]

      setItems(mockItems)
      setFilteredItems(mockItems)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Filter items based on status, type and search query
  useEffect(() => {
    let result = items

    // Filter by status
    if (activeFilter !== "all") {
      if (activeFilter === "lost" || activeFilter === "found") {
        result = result.filter((item) => item.reportType === activeFilter && item.status === "active")
      } else {
        result = result.filter((item) => item.status === activeFilter)
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.itemName.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query),
      )
    }

    setFilteredItems(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [activeFilter, searchQuery, items])

  // Get current items for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get status badge color and icon
  const getStatusBadge = (status, reportType) => {
    if (status === "resolved") {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-800",
        icon: <CheckCircle className="w-4 h-4 mr-1" />,
        label: "Resolved",
      }
    }

    if (reportType === "lost") {
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-800",
        icon: <AlertTriangle className="w-4 h-4 mr-1" />,
        label: "Lost",
      }
    }

    return {
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      icon: <Package className="w-4 h-4 mr-1" />,
      label: "Found",
    }
  }

  // Handle status change
  const handleStatusChange = (itemId) => {
    setIsUpdating(true)

    // Simulate API call to update status
    setTimeout(() => {
      setItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, status: "resolved" } : item)))
      setSelectedItem(null)
      setIsUpdating(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reported Items</h1>
          <p className="mt-2 text-gray-600">Track and manage your lost and found reports</p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="sm:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
            <div className={`sm:flex gap-2 ${showFilters ? "flex" : "hidden"} flex-wrap`}>
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("lost")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === "lost"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Lost
              </button>
              <button
                onClick={() => setActiveFilter("found")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === "found"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Found
              </button>
              <button
                onClick={() => setActiveFilter("resolved")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeFilter === "resolved"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>

        {/* Items List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "No items match your search criteria."
                : activeFilter !== "all"
                  ? `You don't have any ${activeFilter} items.`
                  : "You haven't reported any items yet."}
            </p>
            <Link
              to="/LostAndFound"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Report an Item
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((item) => {
                const statusBadge = getStatusBadge(item.status, item.reportType)

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative">
                      <img
                        src={item.itemImage || "/placeholder.svg"}
                        alt={item.itemName}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.bgColor} ${statusBadge.textColor}`}
                        >
                          {statusBadge.icon}
                          {statusBadge.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.itemName}</h3>
                        <span className="text-sm font-medium text-gray-500">#{item.id}</span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          <span>Reported on {formatDate(item.reportDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{item.location}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-2">{item.description}</p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="text-sm font-medium text-gray-700">{item.category}</div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>

                          {item.status === "active" && (
                            <button
                              onClick={() => handleStatusChange(item.id)}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1 ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedItem.itemName}</h2>
              <button onClick={() => setSelectedItem(null)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={selectedItem.itemImage || "/placeholder.svg"}
                alt={selectedItem.itemName}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Report ID</span>
                <span className="text-sm font-medium">{selectedItem.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span
                  className={`text-sm font-medium ${
                    selectedItem.status === "resolved"
                      ? "text-green-600"
                      : selectedItem.reportType === "lost"
                        ? "text-red-600"
                        : "text-blue-600"
                  }`}
                >
                  {selectedItem.status === "resolved"
                    ? "Resolved"
                    : selectedItem.reportType === "lost"
                      ? "Lost"
                      : "Found"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm font-medium">{selectedItem.category}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Report Date</span>
                <span className="text-sm font-medium">{formatDate(selectedItem.reportDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Contact</span>
                <span className="text-sm font-medium">{selectedItem.contactPhone}</span>
              </div>

              <div>
                <span className="text-sm text-gray-500 block mb-1">Location</span>
                <span className="text-sm font-medium">{selectedItem.location}</span>
              </div>

              <div>
                <span className="text-sm text-gray-500 block mb-1">Description</span>
                <p className="text-sm">{selectedItem.description}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>

              {selectedItem.status === "active" && (
                <button
                  onClick={() => handleStatusChange(selectedItem.id)}
                  disabled={isUpdating}
                  className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 flex items-center ${
                    isUpdating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Resolved
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportedItems

