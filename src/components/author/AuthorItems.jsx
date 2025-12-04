import ItemCard from "../UI/ItemCard";

const AuthorItems = ({ data, loading, error }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {error ? (
            <p className="text-center">Error: {error?.message}</p>
          ) : loading ? (
            [...Array(8)].map((_, index) => (
              <ItemCard key={index} loading={loading} grid />
            ))
          ) : (
            data?.nftCollection?.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                authorImage={data?.authorImage}
                authorId={data?.authorId}
                grid
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
