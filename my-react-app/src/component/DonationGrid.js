import DonationCard from "./DonationCard";

const DonationGrid = ({ 
    categories, 
    isGabai, 
    onDelete, 
    onShowPayment,
    donations 
}) => {
    return (
        <div className="donation-grid">
            {categories.map(category => (
                <DonationCard
                    key={category.id}
                    category={category}
                    isGabai={isGabai}
                    onDelete={onDelete}
                    onShowPayment={onShowPayment}
                    donations={donations[category.id] || []}
                />
            ))}
        </div>
    );
};
  
  export default DonationGrid;