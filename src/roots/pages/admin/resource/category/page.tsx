import { useState } from "react";
import useCategory from "../../../../../hooks/useCategory.hook";

const CategoryAdminPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const { create } = useCategory();
  const onSubmit = (e) => {
    e.preventDefault();
    if (file) {
      create(name, file);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CategoryAdminPage;
