"use client"

import { useState, useEffect } from "react"
import { FolderIcon, FileIcon, Upload, ChevronRight, ChevronDown, Search, Moon, Sun } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Switch } from "~/components/ui/switch"

// Mock data
const initialData = {
  name: "Root",
  type: "folder" as const,
  children: [
    {
      name: "Documents",
      type: "folder" as const,
      children: [
        { name: "Project Proposal.docx", type: "file" as const, url: "#" },
        { name: "Budget.xlsx", type: "file" as const, url: "#" },
      ],
    },
    {
      name: "Images",
      type: "folder" as const,
      children: [
        { name: "Vacation.jpg", type: "file" as const, url: "#" },
        { name: "Family.png", type: "file" as const, url: "#" },
      ],
    },
    { name: "Notes.txt", type: "file" as const, url: "#" },
  ],
}

type Item = {
  name: string
  type: "file" | "folder"
  children?: Item[]
  url?: string
}

const File = ({ name, url }: { name: string; url: string }) => (
  <a
    href={url}
    className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
  >
    <FileIcon className="w-6 h-6 mr-3 text-blue-500 dark:text-blue-400" />
    <span className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
      {name}
    </span>
  </a>
)

const Folder = ({ item, level = 0 }: { item: Item; level?: number }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!item) return null

  return (
    <div>
      <div
        className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6 mr-3 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronRight className="w-6 h-6 mr-3 text-gray-500 dark:text-gray-400" />
        )}
        <FolderIcon className="w-6 h-6 mr-3 text-yellow-500 dark:text-yellow-400" />
        <span className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
          {item.name}
        </span>
      </div>
      {isOpen && item.children && (
        <div style={{ paddingLeft: `${(level + 1) * 24}px` }} className="mt-1">
          {item.children.map((child, index) => (
            <div key={index} className="my-1">
              {child.type === "folder" ? (
                <Folder item={child} level={level + 1} />
              ) : (
                <File name={child.name} url={child.url ?? "#"} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const UploadButton = () => {
  const handleUpload = () => {
    alert("Upload functionality would be implemented here")
  }

  return (
    <Button
      onClick={handleUpload}
      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
    >
      <Upload className="w-5 h-5 mr-2" />
      Upload
    </Button>
  )
}

const SearchBar = () => (
  <div className="relative flex-grow mr-4">
    <Input
      type="text"
      placeholder="Search files..."
      className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring focus:ring-blue-200 dark:focus:ring-blue-300 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
  </div>
)

const DarkModeToggle = ({
  isDarkMode,
  setIsDarkMode,
}: { isDarkMode: boolean; setIsDarkMode: (isDark: boolean) => void }) => (
  <div className="flex items-center space-x-2">
    <Sun className={`w-5 h-5 ${isDarkMode ? "text-gray-400 dark:text-gray-500" : "text-yellow-500"}`} />
    <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
    <Moon className={`w-5 h-5 ${isDarkMode ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`} />
  </div>
)

export default function GoogleDriveClone() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Google Drive Clone</h1>
        <div className="flex justify-between items-center mb-6">
          <SearchBar />
          <div className="flex space-x-4">
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <UploadButton />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6">
          <Folder item={initialData} />
        </div>
      </div>
    </div>
  )
}

