import { Link } from "react-router-dom";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { GrPrevious, GrNext } from "react-icons/gr";

function PageSelection(props) {
  const { page, limit, pageMax } = props;
  return (
    <div className="page-selection">
      {Number(page) !== 1 && (
        <>
          <span>
            <Link to={`/?page=${1}&limit=${limit}`}>
              <LuChevronFirst />
            </Link>
          </span>
          <span>
            <Link to={`/?page=${Number(page) - 1}&limit=${limit}`}>
              <GrPrevious />
            </Link>
          </span>
        </>
      )}
      {limit &&
        Array.from(Array(pageMax).keys()).map((index) => {
          return (
            <span
              key={index + 1}
              className={index + 1 === Number(page) ? "active" : undefined}
            >
              <Link to={`/?page=${index + 1}&limit=${limit}`}>{index + 1}</Link>
            </span>
          );
        })}
      {page !== String(pageMax) && (
        <>
          <span>
            <Link to={`/?page=${Number(page) + 1}&limit=${limit}`}>
              <GrNext />
            </Link>
          </span>
          <span>
            <Link to={`/?page=${pageMax}&limit=${limit}`}>
              <LuChevronLast />
            </Link>
          </span>
        </>
      )}
    </div>
  );
}

export default PageSelection;
