/* eslint-disable react-hooks/exhaustive-deps */
import "./SortToolBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { sortOptionsConstant, sortDir } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { updateSort } from "../../redux/slices/cardSlice";

function SortToolBar() {
  const sortOptions = sortOptionsConstant;
  const { selectedType } = useSelector((state) => state.cards.sortOptions);
  const dispatch = useDispatch();

  const onSortClick = (sortType, sortDir, index) => {
    dispatch(updateSort({ sortType, sortDir }));
    sortOptions[index].direction = sortDir;
  };

  return (
    <div className="toolbar">
      {sortOptions.map(({ type, label, direction }, index) => (
        <button
          key={type + label + index}
          className={"sort-btn " + (type === selectedType ? " selected" : "")}
          onClick={() =>
            onSortClick(
              type,
              direction === sortDir.ASC ? sortDir.DESC : sortDir.ASC,
              index
            )
          }
        >
          {label}
          {"   "}
          <span style={{ paddingLeft: "10px" }}>
            <FontAwesomeIcon
              icon={
                type === selectedType
                  ? direction === sortDir.ASC
                    ? faSortUp
                    : faSortDown
                  : faSort
              }
              size="xl"
              color="gray"
            />
          </span>
        </button>
      ))}
    </div>
  );
}

export default SortToolBar;
