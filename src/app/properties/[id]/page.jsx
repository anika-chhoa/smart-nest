import { getPropertyByPropertyId } from '@/lib/api/properties';
import PropertyDetailsClient from './PropertyDetailsClient';

const PropertyDetailsPage = async ({ params }) => {
    const { id } = await params;
    const property = await getPropertyByPropertyId(id);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-primary font-body">
                <p className="text-lg font-semibold">Luxury residence not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <PropertyDetailsClient property={property} />
        </div>
    );
};

export default PropertyDetailsPage;