import React from "react";

function AverageExpenseCard(list) {
  return (
    <div className="w-[80%] flex flex-col my-6 items-center bg-[#f4f4f4] p-5 rounded-md box-shadow shadow-lg">
      <div className="w-full font-semibold text-xl">{list._id}</div>
      <div className="flex w-full font-medium">
        <div className="w-1/3 ">Past Average</div>
        <div className="w-1/3 ">This Month</div>
        <div className="w-1/3 ">
          {list.mergedValues.average - list.mergedValues.total >= 0
            ? "Save"
            : "Spent"}
        </div>
      </div>
      <div className="flex w-full font-semibold">
        <div className="w-1/3 ">
          ₹{Number(list.mergedValues.average).toFixed(2)}
        </div>
        <div className="w-1/3 ">
          {" "}
          ₹{Number(list.mergedValues.total).toFixed(2)}
        </div>
        {list.mergedValues.average - list.mergedValues.total >= 0 ? (
          <div className="w-1/3 text-green-700 f">
            ₹
            {Number(
              list.mergedValues.average - list.mergedValues.total
            ).toFixed(2)}
          </div>
        ) : (
          <div className="w-1/3 text-red-700">
            ₹
            {Number(
              list.mergedValues.total - list.mergedValues.average
            ).toFixed(2)}
          </div>
        )}
      </div>
      {/* <div>
        <div>{list._id}</div>
        <div>average - {list.mergedValues.average}</div>
        <div>thisMonth - {list.mergedValues.total}</div>
        {list.mergedValues.average - list.mergedValues.total >= 0 ? (
          <div>saved {list.mergedValues.average - list.mergedValues.total}</div>
        ) : (
          <div>Loss {list.mergedValues.average - list.mergedValues.total}</div>
        )}
      </div> */}
    </div>
  );
}

export default AverageExpenseCard;
