const Results = ({ right, wrong }) => {
  return (
    <div className="flex flex-row">
      <h1 className="text-5xl text-green-500">{right}</h1>
      <h1 className="text-5xl px-5">:</h1>
      <h1 className="text-5xl text-red-500">{wrong}</h1>
    </div>
  );
};

export default Results;
