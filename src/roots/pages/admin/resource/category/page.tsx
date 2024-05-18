import { useEffect, useState } from "react";
import useCategory from "../../../../../hooks/useCategory.hook";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

type Category = {
  id: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  slug: string;
  image: string;
};

const MAX_ITEMS_PER_PAGE = 10;
const CategoryAdminPage: React.FC = () => {
  const { fetchCategories, create } = useCategory();
  const [data, setData] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editing, setEditing] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [actionTarget, setActionTarget] = useState<number>(-1);
  const [formError, setFormError] = useState<string | null>(null);

  const init = async () => {
    const cates = await fetchCategories();
    setData(cates);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    function handleOnClick(e: MouseEvent) {
      if (adding || deleting || editing) return;
      if (e.target instanceof HTMLElement && e.target.id === "modalbg") {
        setFormError(null);
        setShowAddModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
      }
    }
    addEventListener("click", handleOnClick);
    return () => {
      removeEventListener("click", handleOnClick);
    };
  }, [adding, deleting, editing]);

  useEffect(() => {
    function handleInput(_: Event) {
      setFormError(null);
    }
    addEventListener("input", handleInput);
    return () => {
      removeEventListener("input", handleInput);
    };
  }, []);

  function handleDisplayEdit(index: number) {
    return () => {
      setActionTarget(index);
      setShowEditModal(true);
    };
  }
  function handleDisplayDelete(index: number) {
    return () => {
      setActionTarget(index);
      setShowDeleteModal(true);
    };
  }

  function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const categoryName = formData.get("categoryName") as string;
    const file = formData.get("file") as string;

    if (!categoryName || !file) return;

    setFormError(null);
    setAdding(true);

    create(categoryName, file).then(() => {
      setShowAddModal(false);
      setFormError(null);
    });
  }

  function handleEditCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const categoryName = formData.get("categoryName") as string;
    const file = formData.get("file") as File;

    if (!categoryName && file.size === 0) {
      setFormError("Không có thông tin cần cập nhật");
      return;
    }

    if (file.size > 0 && !file.type.startsWith("image")) {
      setFormError("Chỉ chấp nhận file ảnh");
      return;
    }

    setFormError(null);
    setEditing(true);

    setTimeout(() => {
      setEditing(false);
      // giả lập cập nhật thành công/ thất bại
      if (Math.random() > 0.5) {
        setShowEditModal(false);
        setFormError(null);
      } else {
        setFormError("Có lỗi xảy ra khi cập nhật");
      }
    }, 1000);
  }

  function handleDeleteCategory() {
    setFormError(null);
    setDeleting(true);

    setTimeout(() => {
      setDeleting(false);

      // giả lập xóa thành công/ thất bại
      if (Math.random() > 0.5) {
        setShowDeleteModal(false);
        setFormError(null);
      } else {
        setFormError("Có lỗi xảy ra khi xóa");
      }
    }, 1000);
  }

  const TOTAL_PAGES = Math.ceil(data.length / MAX_ITEMS_PER_PAGE);
  const renderData = data.slice(
    page * MAX_ITEMS_PER_PAGE,
    (page + 1) * MAX_ITEMS_PER_PAGE
  );
  return (
    <div className="w-full min-h-[calc(100svh-64px)]">
      <div className="w-full lg:w-[1024px] mx-auto py-10 px-2 lg:px-0 overflow-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between">
          <h2 className="font-bold text-lg">Category Management</h2>
          <button
            className="flex items-center bg-green-600 text-white rounded-md p-2 mt-2 sm:mt-0"
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus />
            <span className="ml-2 text-xs sm:text-base font-semibold">
              Thêm Category
            </span>
          </button>
        </div>
        <div className="w-full min-w-[400px] mt-4">
          <table className="w-full border bg-bg-container-color rounded-md drop-shadow-lg">
            <thead>
              <tr className="h-12">
                <th className="w-20">ID</th>
                <th className="text-left">Tên</th>
                <th>Ảnh</th>
                <th className="w-48 md:w-72">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {renderData.map((item, i) => (
                <tr key={item.id} className="border h-12">
                  <td className="text-center">{item.id}</td>
                  <td className="truncate max-w-40">{item.name}</td>
                  <td className="size-10 select-none">
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td className="text-center">
                    <button
                      className=""
                      onClick={handleDisplayEdit(page * MAX_ITEMS_PER_PAGE + i)}
                    >
                      <FaPen />
                    </button>
                    <button
                      className="ml-4"
                      onClick={handleDisplayDelete(
                        page * MAX_ITEMS_PER_PAGE + i
                      )}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {renderData.length < MAX_ITEMS_PER_PAGE &&
                Array.from({
                  length: MAX_ITEMS_PER_PAGE - renderData.length,
                }).map((_, i) => (
                  <tr key={i} className="border h-12">
                    <td className="text-center">-</td>
                    <td className="truncate max-w-40">-</td>
                    <td className="size-10">-</td>
                    <td className="text-center">-</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-end items-center mt-4 mr-4">
            <button
              title="first"
              className={`${page === 0 ? "opacity-20" : ""}`}
              onClick={() => setPage(0)}
              disabled={page === 0}
            >
              <FaAnglesLeft />
            </button>
            <button
              className={`${page === 0 ? "opacity-20" : ""}`}
              title="previous"
              onClick={() => setPage((page) => (page == 0 ? 0 : page - 1))}
              disabled={page === 0}
            >
              <FaAngleLeft />
            </button>
            <div className="ml-2 w-14 text-center text-sm">
              {page + 1} of {TOTAL_PAGES}
            </div>
            <button
              className={`${page == TOTAL_PAGES - 1 ? "opacity-20" : ""}`}
              title="next"
              onClick={() =>
                setPage((page) => (page == TOTAL_PAGES - 1 ? page : page + 1))
              }
              disabled={page == TOTAL_PAGES - 1}
            >
              <FaAngleRight />
            </button>
            <button
              className={`${page == TOTAL_PAGES - 1 ? "opacity-20" : ""}`}
              title="last"
              onClick={() => setPage(TOTAL_PAGES - 1)}
              disabled={page == TOTAL_PAGES - 1}
            >
              <FaAnglesRight />
            </button>
          </div>
        </div>
      </div>

      {(showAddModal || showEditModal || showDeleteModal) && (
        <div
          className="fixed w-screen h-screen inset-0 flex justify-center items-center bg-bg-container-color-trans bg-opacity-60 animate-fade-in"
          id="modalbg"
        >
          {showAddModal ? (
            <div className="rounded-md bg-bg-color p-2 ">
              <h3 className="font-semibold text-center select-none">
                Create a category
              </h3>
              <form className="mt-4 w-72" onSubmit={handleAddCategory}>
                <input
                  name="categoryName"
                  type="text"
                  placeholder="Name"
                  className="outline-none border w-full p-2 rounded-md bg-bg-container-color"
                  required
                />
                <br />
                <input
                  name="file"
                  type="file"
                  accept="image/*"
                  className="outline-none mt-2 border w-full p-2 rounded-md bg-bg-container-color"
                  required
                />
                <br />
                {formError && (
                  <p className="text-red-600 text-sm text-center">
                    {formError}
                  </p>
                )}

                <button
                  className="mt-4 bg-green-600 text-white w-full p-2 rounded-md disabled:opacity-50 select-none"
                  disabled={adding}
                >
                  Tiếp tục
                </button>
              </form>
            </div>
          ) : showEditModal ? (
            <div className="rounded-md bg-bg-color p-2">
              <h3 className="font-semibold text-center select-none">
                Cập Nhật Category
              </h3>
              <form className="mt-4 w-72" onSubmit={handleEditCategory}>
                <input
                  name="categoryName"
                  type="text"
                  placeholder="Tên mới"
                  className="outline-none border w-full p-2 rounded-md"
                />
                <br />
                <input
                  name="file"
                  type="file"
                  accept="image/*"
                  className="outline-none mt-2 border w-full p-2 rounded-md"
                />
                <br />
                {formError && (
                  <p className="text-red-600 text-sm text-center">
                    {formError}
                  </p>
                )}

                <button
                  className="mt-4 bg-green-600 text-white w-full p-2 rounded-md disabled:opacity-50 select-none"
                  disabled={editing}
                >
                  Cập nhật
                </button>
              </form>
            </div>
          ) : (
            <div className="rounded-md bg-bg-color p-2">
              <h3 className="font-semibold text-center select-none">
                Xóa Category
              </h3>
              <p className="mt-4 text-center">
                Bạn có chắc chắn muốn xóa: {data[actionTarget]?.name}? (ID:{" "}
                {data[actionTarget]?.id})
              </p>
              {formError && (
                <p className="text-red-600 text-sm text-center">{formError}</p>
              )}

              <button
                className="mt-4 bg-red-600 text-white w-full p-2 rounded-md disabled:opacity-50 select-none"
                disabled={deleting}
                onClick={handleDeleteCategory}
              >
                Xóa
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryAdminPage;
