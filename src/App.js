import "./App.css";
import "antd/dist/antd.css";
import { Table, Modal, Input } from "antd";
import { useRef, useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Initial State functions
function App() {
  const initialState = {
    id: Math.random() * 1000,
    serial: 0,
    title: "",
    tags: [],
    description: "",
    date: new Date().toLocaleTimeString(),
    due: "",
  };

  const [todoData, setTodoData] = useState(initialState); // data from input
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) || []
  ); // stores all todo data to display in table
  const [searchQuery, setSearchQuery] = useState(""); //search query state
  const [isEditModal, setIsEditModal] = useState(false); // to open and close Modal
  const [editing, setEditing] = useState(""); // contains single task to edit
  const titleRef = useRef(); // to check if title is empty
  const descRef = useRef(); // to check if description is empty
  const tagsRef = useRef(); // to check if description is empty

  //Fetching and updating table with mock data
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  }, []);

  // Handlers and Functions
  function handleTodoData(e) {
    const { name, value } = e.target;
    let tags;
    if (name === "tags") {
      // Split the input value by comma and trim each tag
      tags = value.split(",").map((tag) => tag.trim());
      // Remove duplicates from the tags array
      tags = [...new Set(tags)];
    }
    setTodoData((prev) => ({
      ...prev,
      serial:
        todoList.length === 0
          ? 1
          : Number(todoList[todoList.length - 1].serial) + 1,
      status: "Open",
      [name]: name === "tags" ? tags : value,
      date: new Date().toLocaleTimeString(),
    }));
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleAddTodoList() {
    // to add tasks to table
    if (titleRef.current.value.length > 0 && descRef.current.value.length > 0) {
      setTodoList((prev) => {
        localStorage.setItem("todoList", JSON.stringify([...prev, todoData]));
        return [...prev, todoData];
      });
      setTodoData(initialState);
    } else {
      alert("Please fill both title and description");
    }
  }

  function handleDelete(record) {
    // delete tasks on click delete button
    Modal.confirm({
      title: "Are you sure want to delete this?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setTodoList((prev) => prev.filter((item) => item.id !== record.id));
        localStorage.setItem(
          "todoList",
          JSON.stringify(todoList.filter((item) => item.id !== record.id))
        );
      },
    });
  }

  function handleEdit(record) {
    // to open modal of edit button
    setIsEditModal(true);
    setEditing(record);
  }

  function editTask(e) {
    // modal button edit
    setIsEditModal(false);
    console.log(e.id);
    setTodoList((prev) => {
      return prev.map((item) => {
        if (
          (item.title.toLowerCase() !== e.title.toLowerCase() ||
            item.description.toLowerCase() !== e.title.toLowerCase()) &&
          item.id === e.id
        ) {
          return { ...item, ...editing };
        } else {
          return { ...item };
        }
      });
    });
    // Saving Data in localStorage
    localStorage.setItem(
      "todoList",
      JSON.stringify(
        todoList.map((item) => {
          if (
            (item.title.toLowerCase() !== e.title.toLowerCase() ||
              item.description.toLowerCase() !== e.title.toLowerCase()) &&
            item.id === e.id
          ) {
            return { ...item, ...editing };
          } else {
            return { ...item };
          }
        })
      )
    );
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    let tags;
    if (name === "tags") {
      // Split the input value by comma and trim each tag
      tags = value.split(",").map((tag) => tag.trim());
      // Remove duplicates from the tags array
      tags = [...new Set(tags)];
    }
    setEditing((prev) => ({
      ...prev,
      status: "Open",
      [name]: name === "tags" ? tags : value,
    }));
  }

  // Working With Ant-Pro Tables
  //Creating Columns
  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serial",
      key: "id",
      sorter: (a, b) => a.serial - b.serial,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "id",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "id",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "id",
      sorter: (a, b) => a.tags.join(",").localeCompare(b.tags.join(",")),
    },
    {
      title: "Created Time",
      dataIndex: "date",
      key: "id",
      sorter: (a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0),
    },
    {
      title: "Due Date",
      dataIndex: "due",
      key: "id",
      sorter: (a, b) => new Date(a.due) - new Date(b.due),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "id",
      filters: [
        {
          text: "Open",
          value: "Open",
        },
        {
          text: "Working",
          value: "Working",
        },
        {
          text: "Done",
          value: "Done",
        },
        {
          text: "Overdue",
          value: "Overdue",
        },
      ],
      onFilter: (value, record) => record.status.includes(value),
    },
    {
      title: "Actions",
      key: "id",
      render: (record) => {
        return (
          <>
            <EditOutlined
              id={todoData.id}
              onClick={() => {
                handleEdit(record);
              }}
            />
            <DeleteOutlined
              id={todoData.id}
              onClick={() => {
                handleDelete(record);
              }}
              style={{ color: "red", marginLeft: 25 }}
            />
          </>
        );
      },
    },
  ];

  //HTML Rendering
  return (
    <div className="todo">
      <div className="top-container">
        <div className="input-container">
          <h1>To-Do List App</h1>
          <input
            type="text"
            placeholder="Title"
            maxLength="100"
            className="title_input"
            name="title"
            ref={titleRef}
            value={todoData.title}
            onChange={handleTodoData}
          />
          <input
            type="text"
            placeholder="Description"
            maxLength="1000"
            className="desc_input"
            name="description"
            ref={descRef}
            value={todoData.description}
            onChange={handleTodoData}
          />
          <input
            type="text"
            maxLength="1000"
            className="tags_input"
            name="tags"
            placeholder="Add tags (comma-separated)"
            onChange={handleTodoData}
            value={todoData.tags}
            ref={tagsRef}
          />
          <div className="picker_input">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              className="due_input"
              name="due"
              min={new Date().toISOString().split("T")[0]}
              value={todoData.due}
              onChange={handleTodoData}
            />
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              id="status"
              className="status_input"
              value={todoData.status}
              onChange={handleTodoData}
            >
              <option value="Open">Open</option>
              <option value="Working">Working</option>
              <option value="Done">Done</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
        <div className="btn-container">
          <button className="btn add_btn" onClick={handleAddTodoList}>
            Add Task
          </button>
        </div>
      </div>
      <Input.Search
        placeholder="Search tasks"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={todoList.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        className="table"
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ width: 800, margin: "0 auto" }}
      ></Table>

      <Modal
        title="Edit Task"
        visible={isEditModal}
        id={editing.id}
        onCancel={() => setIsEditModal(false)}
        onOk={() => editTask(editing)}
      >
        <Input
          type="text"
          name="title"
          value={editing.title}
          onChange={handleEditChange}
        />
        <Input
          type="text"
          name="description"
          value={editing.description}
          onChange={handleEditChange}
        />

        <Input
          type="text"
          name="tags"
          value={editing.tags}
          onChange={handleEditChange}
        />

        <Input
          type="date"
          name="due"
          min={new Date().toISOString().split("T")[0]}
          value={editing.due}
          onChange={handleEditChange}
        />
        <label htmlFor="status">Status:</label>
        <select
          name="status"
          id="status"
          className="status_input"
          value={editing.status}
          onChange={handleEditChange}
        >
          <option value="Open">Open</option>
          <option value="Working">Working</option>
          <option value="Done">Done</option>
          <option value="Overdue">Overdue</option>
        </select>
      </Modal>
    </div>
  );
}

export default App;
