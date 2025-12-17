import { useParams } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';

export function BusinessProfilePage() {
  const { id } = useParams();

  return (
    <PublicLayout>
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <div className="w-24 h-8 bg-gray-400"></div>
          </div>

          {/* Business Header */}
          <div className="bg-white border-2 border-gray-300 p-8 mb-6">
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-gray-400"></div>
              <div className="flex-1">
                <div className="w-2/3 h-10 bg-gray-500 mb-2"></div>
                <div className="w-48 h-6 bg-gray-300 mb-4"></div>
                <div className="flex gap-2">
                  <div className="w-20 h-6 bg-gray-300"></div>
                  <div className="w-24 h-6 bg-gray-300"></div>
                  <div className="w-28 h-6 bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Description */}
          <div className="bg-white border-2 border-gray-300 p-8 mb-6">
            <div className="w-48 h-8 bg-gray-500 mb-4"></div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200"></div>
              <div className="w-full h-4 bg-gray-200"></div>
              <div className="w-full h-4 bg-gray-200"></div>
              <div className="w-full h-4 bg-gray-200"></div>
              <div className="w-3/4 h-4 bg-gray-200"></div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white border-2 border-gray-300 p-8 mb-6">
            <div className="w-32 h-8 bg-gray-500 mb-4"></div>
            <div className="w-64 h-4 bg-gray-300 mb-2"></div>
            <div className="w-48 h-4 bg-gray-300 mb-4"></div>
            <div className="w-full h-48 bg-gray-200 border-2 border-gray-300"></div>
          </div>

          {/* Contact Information */}
          <div className="bg-white border-2 border-gray-300 p-8 mb-6">
            <div className="w-56 h-8 bg-gray-500 mb-4"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-400"></div>
                <div className="w-48 h-4 bg-gray-300"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-400"></div>
                <div className="w-56 h-4 bg-gray-300"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gray-400"></div>
                <div className="w-40 h-4 bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="bg-white border-2 border-gray-300 p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="w-64 h-6 bg-gray-400 mb-2"></div>
                <div className="w-96 h-4 bg-gray-200"></div>
              </div>
              <div className="w-56 h-12 bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
