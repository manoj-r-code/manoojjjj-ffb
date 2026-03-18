function CatCard({ cat }) {
    return (
      <div className="cat-card">
        <img src={cat.url} alt="Cute cat" className="cat-image" />
      </div>
    );
  }
  
  export default CatCard;
  