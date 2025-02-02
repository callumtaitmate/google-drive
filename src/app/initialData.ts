
export const initialData = {
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