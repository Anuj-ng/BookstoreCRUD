import React from "react";
import { useState } from "react";
import { bookBaseUrl } from "../axiosInstance";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Home = () => {
  const ToastSwal = Swal.mixin({
    background: "#254F22",
    color: "#EDE4C2",
    confirmButtonColor: "#F5824A",
    cancelButtonColor: "#A03A13",
    customClass: {
      popup: "rounded-xl",
      title: "text-lg font-semibold",
    },
  });

  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    id: "",
  });

  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const getAllbookList = async () => {
    try {
      const { data } = await bookBaseUrl.get("booklist");
      setBookList(data?.BookList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllbookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!isUpdating) {
        const { data } = await bookBaseUrl.post("/addbook", bookForm);
        if (data?.success) {
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            id: "",
          });
          ToastSwal.fire({
            title: "Book Added 📚",
            text: data?.message,
            icon: "success",
          });
          getAllbookList();
        } else {
          ToastSwal.fire({
            title: "Oops!",
            text: "Something went wrong",
            icon: "error",
          });
        }
      } else {
        const { data } = await bookBaseUrl.put("/updatebook", bookForm);

        if (data?.success) {
          setBookForm({
            BookName: "",
            BookTitle: "",
            Author: "",
            SellingPrice: "",
            PublishDate: "",
            id: "",
          });
          setIsUpdating(false); // ⭐ REQUIRED
          setUpdateId(null);
          ToastSwal.fire({
            title: "Book Updated 📚",
            text: "Book Upated Successfully",
            icon: "success",
          });
          getAllbookList();
        } else {
          ToastSwal.fire({
            title: "Oops!",
            text: "Something went wrong",
            icon: "error",
          });
          setIsUpdating(false);
          setUpdateId(null);
        }
      }
    } catch (err) {
      ToastSwal.fire({
        title: "Server Error",
        text: err?.response?.data?.message || "Backend not reachable",
        icon: "error",
      });
    }
  };
  const handleDelete = async (id) => {
    // 1️⃣ ask confirmation first
    const confirm = await ToastSwal.fire({
      title: "Delete Book?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    // if user clicked cancel → stop
    if (!confirm.isConfirmed) return;

    try {
      // 2️⃣ call delete API
      const { data } = await bookBaseUrl.delete("/deletebook", {
        data: { id },
      });

      // 3️⃣ success popup
      if (data.success) {
        ToastSwal.fire({
          title: "Deleted 🗑️",
          text: data.message,
          icon: "success",
        });

        // optional: refresh table
        getAllbookList();
      }
    } catch (err) {
      ToastSwal.fire({
        title: "Error",
        text: err?.response?.data?.message || "Delete failed",
        icon: "error",
      });
    }
  };
  const handleUpdate = (data) => {
    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      Author: data?.Author,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
      id: data?._id,
    });
    setIsUpdating(true);
    setUpdateId(data?._id);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 min-h-[calc(100vh-64px)] bg-[#254F22] text-[#EDE4C2]">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight pt-10 mb-2">
        Book Manager
      </h1>
      <p className="text-[#EDE4C2]/70 mb-10 text-sm">
        Add books to your collection
      </p>

      {/* FORM */}
      <div className="bg-black/20 border border-[#EDE4C2]/20 p-6 sm:p-8 backdrop-blur-sm">
        {/* ⭐ responsive grid fixed */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {/** inputs unchanged */}
          <Input
            label="Book Name"
            name="BookName"
            value={bookForm.BookName}
            onChange={handleFormChange}
          />
          <Input
            label="Book Title"
            name="BookTitle"
            value={bookForm.BookTitle}
            onChange={handleFormChange}
          />
          <Input
            label="Author"
            name="Author"
            value={bookForm.Author}
            onChange={handleFormChange}
          />
          <Input
            label="Price"
            name="SellingPrice"
            value={bookForm.SellingPrice}
            onChange={handleFormChange}
          />
          <Input
            label="Publish Date"
            name="PublishDate"
            type="date"
            value={bookForm.PublishDate}
            onChange={handleFormChange}
          />
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleSubmit}
            className="bg-[#F5824A] text-black px-8 py-3 text-sm font-semibold hover:bg-[#EDE4C2] transition-all"
          >
            Submit
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full mt-14">
        {/* ⭐ mobile scroll fix */}
        <div className="border border-[#EDE4C2]/20 bg-black/20 backdrop-blur-sm overflow-x-auto">
          {/* ⭐ prevent shrink */}
          <table className="w-full min-w-175 text-left">
            <thead className="border-b border-[#EDE4C2]/20">
              <tr className="text-[#EDE4C2]/70 text-xs uppercase tracking-wider">
                <th className="px-6 py-4">Book Name</th>
                <th className="px-6 py-4">Book Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Selling Price</th>
                <th className="px-6 py-4">Publish Date</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookList.map((book, index) => (
                <tr
                  key={index}
                  className="border-t border-[#EDE4C2]/10 hover:bg-[#EDE4C2]/5 transition"
                >
                  <td className="px-6 py-4">{book.BookName}</td>
                  <td className="px-6 py-4">{book.BookTitle}</td>
                  <td className="px-6 py-4">{book.Author}</td>
                  <td className="px-6 py-4">{book.SellingPrice}</td>
                  <td className="px-6 py-4">{book.PublishDate}</td>
                  <td className="px-6 py-4">
                    <div className="w-20 flex justify-center gap-4 text-lg">
                      {/* Edit */}
                      <FaPen
                        onClick={() => handleUpdate(book)}
                        className="cursor-pointer text-[#2cb339] hover:scale-110 transition"
                        title="Edit Book"
                      />

                      {/* Delete */}
                      <MdDelete
                        onClick={() => handleDelete(book._id)}
                        className="cursor-pointer text-red-400 hover:text-red-500 hover:scale-125  scale-150 transition"
                        title="Delete Book"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* small reusable input to avoid repeating code */
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs uppercase tracking-wider text-[#EDE4C2]/70">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      className="bg-transparent border-b border-[#EDE4C2]/40 focus:border-[#F5824A] outline-none h-10 transition-all placeholder:text-[#EDE4C2]/40"
    />
  </div>
);

export default Home;
