import styles from './Protocols.module.scss';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Arrows } from '../../assets/icons/arrows.svg';
import {
  useAddCategoriesMutation,
  useDeleteCategoriesMutation,
} from '../../redux/Api/categoriesApi.ts';
import {
  useAddSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
} from '../../redux/Api/subCategoriesApi.ts';
import Categories from '../Categories/Categories.tsx';
import SubCategories from '../SubCategories/SubCategories.tsx';

export interface Protocol {
  id: string;
  name: string;
  brand: {
    id: string | undefined;
    name: string | undefined;
  };
  protocol_category: {
    id: string | undefined;
    name: string | undefined;
  };
  images: any[];
}

function Protocols() {
  const [addCategory] = useAddCategoriesMutation();
  const [deleteCategory] = useDeleteCategoriesMutation();
  const [addSubCategory] = useAddSubCategoriesMutation();
  const [deleteSubCategory] = useDeleteSubCategoriesMutation();

  const [inputValueCat, setInputValueCat] = useState('');
  const [inputValueSubCat, setInputValueSubCat] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueCat(e.target.value);
  };

  const handleChangeSub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueSubCat(e.target.value);
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValueCat.trim() !== '') {
      e.preventDefault();
      await addCategory({ name: inputValueCat }).unwrap();
      setInputValueCat('');
    }
    e.preventDefault();
  };

  const handleDeleteItem = async (id: string) => {
    await deleteCategory(id).unwrap();
    if (selectedCategory === id) {
      setIsClicked(false);
    }
  };

  const handleAddSubItem = async (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValueSubCat.trim() !== '') {
      e.preventDefault();
      await addSubCategory({
        name: inputValueSubCat,
        description: inputValueSubCat,
        protocol_category: { id: selectedCategory },
      }).unwrap();
      setInputValueSubCat('');
    }
    e.preventDefault();
  };

  const handleDeleteSubItem = async (id: string) => {
    await deleteSubCategory(id).unwrap();
  };

  const handleCompleteStatusUpdate = (item: { id: string }) => {
    if (item.id !== selectedCategory) {
      setIsClicked(true);
      setSelectedCategory(item.id);
    } else {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    if (isClicked === false) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(selectedCategory);
    }
  }, [isClicked, selectedCategory]);

  return (
    <section className={styles.categories}>
      <div className={styles.categories__elements}>
        <Categories
          handleAddItem={(e) => handleAddItem(e)}
          inputValueCat={inputValueCat}
          handleChange={() => handleChange}
          handleDeleteItem={handleDeleteItem}
          handleCompleteStatusUpdate={handleCompleteStatusUpdate}
          selectedCategory={selectedCategory}
        />
        <Arrows className={styles.arrows} />
        <SubCategories
          isClicked={isClicked}
          handleAddSubItem={handleAddSubItem}
          inputValueSubCat={inputValueSubCat}
          handleChangeSub={handleChangeSub}
          handleDeleteSubItem={handleDeleteSubItem}
          selectedCategory={selectedCategory}
          handleCompleteStatusUpdate={handleCompleteStatusUpdate}
        />
      </div>
    </section>
  );
}

export default Protocols;
