import React, { useEffect, useState } from 'react';
import AddArticleG from './AddArticaleG';
import AllCardsG from './AllCardsG';

const NewsG = () => {

  const [addA, setAddA] = useState(false);
  const onAddArticle = () => {
    setAddA((prev) => !prev)
  };
  useEffect(() => {
  }, [addA]);

  return (<div>
    <AllCardsG title={"חדשות"}
      AddArticle={onAddArticle} />
    <button onClick={() => { setAddA((prev) => !prev) }}>הוסף כתבה</button>
    {addA && <AddArticleG title={"הוסף כתבה"}
      onAddArticle={onAddArticle}
      path={'/gabai/news'}
      setAddA={setAddA}
    />}
  </div>
  );
};

export default NewsG;
