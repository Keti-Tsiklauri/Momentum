import { useContext, useRef, useState } from "react";
import styles from "./taskPage.module.css";
import { GlobalContext } from "../context/globalContext";

export default function TaskPage({ openTask }) {
  const {
    tasks,
    statuses,
    setTasks,
    // Removed setOpenTask update to keep openTask intact.
    taskComments,
    setTaskComments,
  } = useContext(GlobalContext);
  console.log(tasks);
  const [changeStatus, setChangeStatus] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState(""); // New state for reply text
  const [showReplyInput, setShowReplyInput] = useState(false); // Controls visibility of reply input
  const inputRef = useRef(null);

  const selectedElement = tasks.find((task) => task.id === Number(openTask));

  // Update only the tasks array: find the task with the matching id and update its status.
  const handleStatusChange = (newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === Number(openTask) ? { ...task, status: newStatus } : task
      )
    );
    setChangeStatus(false);
  };

  const departmentNameMap = {
    "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
    "ადამიანური რესურსების დეპარტამენტი": "ად.რესურს.",
    "ფინანსების დეპარტამენტი": "ფინანსები",
    "გაყიდვების და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
    "ლოჯისტიკის დეპარტამენტი": "ლოჯისტიკა",
    "ტექნოლოგიების დეპარტამენტი": "ინფ.ტექ.",
    "მედიის დეპარტამენტი": "მედია",
  };

  const departmentName =
    departmentNameMap[selectedElement?.department?.name] ||
    selectedElement?.department?.name ||
    "უცნობი დეპარტამენტი";

  function formatDueDate(dueDate) {
    const daysOfWeek = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
    const date = new Date(dueDate);
    return `${daysOfWeek[date.getDay()]} - ${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
  }

  // When reply image is clicked, open the reply input for that comment.
  function focusInput(parentId) {
    setReplyingTo(parentId);
    setReplyText(""); // Reset reply text when switching comments
    setShowReplyInput(true);
  }

  // Add comment: if replyingTo is set, add as sub-comment; otherwise, add as parent comment.
  function AddComment() {
    const text = inputRef.current?.value?.trim() || replyText.trim();
    if (!text) return;

    setTaskComments((prev) => {
      const updatedComments = [...prev];

      if (replyingTo) {
        // Find the parent comment
        const parentIndex = updatedComments.findIndex(
          (c) => c.id === replyingTo
        );
        if (
          parentIndex !== -1 &&
          updatedComments[parentIndex].sub_comments.length === 0
        ) {
          updatedComments[parentIndex] = {
            ...updatedComments[parentIndex],
            sub_comments: [
              {
                author_avatar:
                  "https://api.dicebear.com/9.x/thumbs/svg?seed=Chrome34.96.41.35",
                author_nickname: "Opal",
                text,
              },
            ],
          };
        }
      } else {
        // Add new parent comment at the beginning
        updatedComments.unshift({
          id: updatedComments.length + 1,
          author_avatar:
            "https://api.dicebear.com/9.x/thumbs/svg?seed=Chrome34.96.41.35",
          author_nickname: "Opal",
          text,
          parent_id: null,
          sub_comments: [],
        });
      }

      return updatedComments;
    });

    if (!replyingTo) {
      inputRef.current.value = "";
    }
    setReplyingTo(null);
    setReplyText("");
    setShowReplyInput(false);
  }

  return (
    <div className={styles.containerForTask}>
      <div>
        <div className={styles.box}>
          <div className={styles.con}>
            <div className={styles[`priority_${selectedElement.priority.id}`]}>
              <img src={selectedElement.priority.icon} alt="Priority Icon" />
              <p>{selectedElement?.priority.name}</p>
            </div>
            <div
              className={styles[`department_${selectedElement.department.id}`]}
            >
              <p>{departmentName}</p>
            </div>
          </div>
          <p className={styles.name}>{selectedElement.name}</p>
          <p className={styles.description}>{selectedElement.description}</p>
        </div>

        <div className={styles.taskDetails}>
          <p className={styles.TaskHeader}>დავალების დეტალები</p>
          <div className={styles.status}>
            <div className={styles.miniBox}>
              <img src="images/pie-chart.png" alt="Status Icon" />
              <p>სტატუსი</p>
            </div>
            <div
              className={changeStatus ? styles.container1 : styles.container}
            >
              <div
                className={styles.boxes}
                onClick={() => setChangeStatus((prev) => !prev)}
              >
                <p>{selectedElement?.status?.name}</p>
                <img
                  src={
                    changeStatus
                      ? "images/arrow-up.png"
                      : "images/arrow-down.png"
                  }
                  alt="Arrow"
                />
              </div>
              {changeStatus && (
                <div className={styles.box3}>
                  {statuses.map((elem, index) => (
                    <p
                      key={index}
                      onClick={() => handleStatusChange(elem)}
                      className={styles.statusSelector}
                    >
                      {elem.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.employees}>
            <div className={styles.box1}>
              <div className={styles.box2}>
                <img src="images/Frame.png" alt="Employee Icon" />
                <p>თანამშრომელი</p>
              </div>
              <div className={styles.employee}>
                <div className={styles.mini2}>
                  <p>{selectedElement.department.name}</p>
                </div>
                <div className={styles.mini1}>
                  <img
                    src={selectedElement.employee.avatar}
                    alt="Employee Avatar"
                  />
                  <p>
                    {selectedElement.employee.name}{" "}
                    {selectedElement.employee.surname}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.box1}>
              <div className={styles.box2}>
                <img src="images/calendar.png" alt="Calendar Icon" />
                <p>დავალების ვადა</p>
              </div>
              <div className={styles.date}>
                <p>{formatDueDate(selectedElement.due_date)}</p>
                <p>ID: {selectedElement.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className={styles.commentBox}>
        <div className={styles.addCom}>
          <textarea
            ref={inputRef}
            placeholder="დაწერე კომენტარი"
            className={styles.inputCom}
          />
          <button className={styles.addComment} onClick={AddComment}>
            დააკომენტარე
          </button>
        </div>

        <div className={styles.boxmini}>
          <p>კომენტარები</p>
          <p>{taskComments?.length}</p>
        </div>

        <div className={styles.commentsBox}>
          {taskComments.map((elem) => (
            <div key={elem.id}>
              <div className={styles.parent}>
                <img
                  src={elem.author_avatar}
                  className={styles.avatar}
                  alt="User Avatar"
                />
                <div className={styles.box0}>
                  <p>{elem.author_nickname}</p>
                  <p>{elem.text}</p>
                  {/* Only show reply icon if no sub-comment exists */}
                  {elem.sub_comments.length === 0 && (
                    <img
                      src="images/Frame 1000005939.png"
                      className={styles.reply}
                      alt="Reply"
                      onClick={() => focusInput(elem.id)}
                    />
                  )}
                </div>
              </div>

              {/* Reply textarea & button for the comment being replied to */}
              {replyingTo === elem.id && showReplyInput && (
                <div className={styles.replyInput}>
                  <textarea
                    onChange={(e) => setReplyText(e.target.value)}
                    value={replyText}
                    className={styles.inputCom}
                    placeholder="უპასუხეთ კომენტარს..."
                  />
                  <div className={styles.addCommentsButtons}>
                    <button className={styles.addComment} onClick={AddComment}>
                      დააკომენტარე
                    </button>
                    <button
                      className={styles.closeReply}
                      onClick={() => {
                        setShowReplyInput(false);
                        setReplyingTo(null);
                        setReplyText("");
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              )}

              {/* Display sub-comment (only one allowed) */}
              {elem.sub_comments.length > 0 && (
                <div className={styles.child}>
                  <img
                    src={elem.sub_comments[0].author_avatar}
                    alt="Subcomment Avatar"
                  />
                  <div>
                    <p>{elem.sub_comments[0].author_nickname}</p>
                    <p>{elem.sub_comments[0].text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
