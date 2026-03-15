import { Button } from "@/components/ui/button";


const CTA2 = () => {
    return (
        <div className="mt-40 py-20 bg-[#EEFEE4]">
            <div className="max-w-3xl mx-auto px-5 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Unlock Your Potential With Lenguable
                </h2>
                <p className="text-gray-600 mb-8">
                    Lorem ipsum dolor sit amet consectetur. Duis vitae tempus magna ipsum at amet
                    consectetur adipiscing elit sed do eiusmod tempor.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline">
                        Join For Free
                    </Button>
                    <Button variant="outline">
                        Join For Free
                    </Button>
                    <Button variant="outline">
                        Join For Free
                    </Button>
                    <Button variant="outline">
                        Join For Free
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CTA2;