import React from "react";

const Main = () => {
  const [list, setList] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [formData, setFormData] = React.useState("");
  const [menu, setMenu] = React.useState();
  //const [filterIt, setFilterIt] = React.useState("")

  function addToItem(e) {
    e.preventDefault();
    if (input !== "") {
      setList([
        ...list,
        { id: Date.now(), names: input, line: false, edit: false },
      ]);
      setInput("");
      return;
    }
  }

  function handleRadio(e) {
    const { name, value, type, checked } = e.target;
    setFormData((item) => {
      return {
        ...item,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <section className="ToDo">
      <form className="ToDo__form" onSubmit={addToItem}>
        <input
          aria-label="ToDo Form"
          className="ToDo__input--form"
          type="text"
          placeholder="What's next?"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <div className="ToDo__button--wrapper">
          <button className="ToDo__button--form">Add</button>
        </div>
      </form>
      <section className="ToDo__filters">
        <fieldset>
          <input
            className="ToDo__filter"
            type="radio"
            name="filter"
            id="all"
            value=""
            onChange={handleRadio}
          />
          <label
            className={
              formData.filter === ""
                ? "ToDo__label--active"
                : "ToDo__label--inactive"
            }
            htmlFor="all"
          >
            Show All
          </label>
          <input
            className="ToDo__filter"
            type="radio"
            name="filter"
            id="completed"
            value="false"
            onChange={handleRadio}
          />
          <label
            className={
              formData.filter === "false"
                ? "ToDo__label--active"
                : "ToDo__label--inactive"
            }
            htmlFor="completed"
          >
            Completed
          </label>
          <input
            className="ToDo__filter"
            type="radio"
            name="filter"
            id="active"
            value={true}
            onChange={handleRadio}
          />
          <label
            className={
              formData.filter === "true"
                ? "ToDo__label--active"
                : "ToDo__label--inactive"
            }
            htmlFor="active"
          >
            Active
          </label>
        </fieldset>

        <div className="ToDo__menu">
          <button
            aria-label="Clear Menu"
            className="ToDo__ellipsis"
            onClick={() => setMenu(!menu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 512"
              height={"22px"}
              width={"22px"}
            >
              <path
                d="M64 360C94.93 360 120 385.1 120 416C120 446.9 
                            94.93 472 64 472C33.07 472 8 446.9 8 416C8 385.1 33.07
                            360 64 360zM64 200C94.93 200 120 225.1 120 256C120 286.9
                            94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07
                            200 64 200zM64 152C33.07 152 8 126.9 8 96C8 65.07 33.07
                            40 64 40C94.93 40 120 65.07 120 96C120 126.9 94.93 152 64 152z"
              />
            </svg>
          </button>
          {menu && (
            <div className="ToDo__clears">
              <button
                className="ToDo__clear"
                onClick={() => setList(list.filter((item) => !item.line))}
              >
                Clear Completed
              </button>
              <button className="ToDo__clear" onClick={() => setList([])}>
                Clear All
              </button>
            </div>
          )}
        </div>
      </section>

      {list
        .filter((item) => item.line.toString() !== formData.filter)
        .map((item) => (
          <div
            key={item.id}
            className={
              item.line ? "ToDo__item--completed" : "ToDo__item--actives"
            }
          >
            <button
              className="ToDo__toggle"
              onClick={() =>
                setList(
                  list.map((num) =>
                    num.id === item.id ? { ...num, line: !num.line } : num
                  )
                )
              }
            >
              {item.line && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={"22px"}
                >
                  <path
                    d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 
                                114.6 512 256C512 397.4 397.4 512 256 512C114.6 512
                                0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1
                                371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224
                                280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3
                                247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9
                                350.7 243.8 339.8L371.8 211.8z"
                  />
                </svg>
              )}
            </button>

            {item.edit && !item.line ? (
              <textarea
                className="ToDo__input--item"
                type="text"
                value={item.names}
                onChange={(e) =>
                  setList(
                    list.map((num) =>
                      num.id === item.id
                        ? { ...num, names: e.target.value }
                        : num
                    )
                  )
                }
              />
            ) : (
              <textarea
                className="ToDo__input--item"
                readOnly
                cols="30"
                rows="10"
              >
                {item.names}
              </textarea>
            )}
            <div className="ToDo__edit--wrapper">
              <button
                className="ToDo__edit"
                onClick={() =>
                  setList(
                    list.map((num) =>
                      num.id === item.id ? { ...num, edit: !num.edit } : num
                    )
                  )
                }
              >
                {item.edit && !item.line ? "Save" : "Edit"}
              </button>
            </div>
            <button
              className="ToDo__remove"
              onClick={() => {
                !item.line && setList(list.filter((el) => el.id !== item.id));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                height={"22px"}
                width={"22px"}
              >
                <path
                  d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4
                            412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160
                            301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63
                            412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375
                            150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160
                            210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0
                            45.25l-105.4 105.4L310.6 361.4z"
                />
              </svg>
            </button>
          </div>
        ))}
    </section>
  );
};
export default Main;
