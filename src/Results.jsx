const Results = ({ right, wrong }) => {
  return (
    <div className="flex justify-center">
      <div className="text-6xl text-green-500">{right}</div>
      <div className="text-6xl px-5">:</div>
      <div className="text-6xl text-red-500">{wrong}</div>
    </div>
  );
};

export default Results;
