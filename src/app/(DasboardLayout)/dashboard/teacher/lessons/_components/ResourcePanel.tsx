"use client";

interface ResourceItem {
  _id: string;
  title: string;
  type: string;
}

interface ResourcePanelProps {
  resources: ResourceItem[];
  isLoading: boolean;
}

function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5">
      <div>
        <p className="text-sm font-semibold text-gray-900">{item.title}</p>

        <p className="text-xs text-gray-500 mt-1">Type: {item.type}</p>
      </div>
    </div>
  );
}

export function ResourcePanel({ resources, isLoading }: ResourcePanelProps) {
  return (
    <main className="flex-1 bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-5">Resources</h2>

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading resources...</p>
      ) : resources.length === 0 ? (
        <p className="text-sm text-gray-400">No resources available</p>
      ) : (
        <div className="space-y-3">
          {resources.map((item) => (
            <ResourceCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
