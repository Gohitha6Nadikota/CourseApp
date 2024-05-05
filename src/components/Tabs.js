import React, { useState } from "react";

const Tabs = ({ datas }) => {
  const [open, setOpen] = useState(0);
  const { prerequisites, syllabus, students } = datas;
  const handle = (num) => {
    setOpen(num);
  };
  return (
    <div className="flex flex-col my-[40px] shadow-xl h-auto min-h-[220px]">
      <div className="flex items-center flex-col md:flex-row">
        <div className="w-[80vw] flex flex-col mt-7 md:w-[30vw]">
          <button
            className={`border border-black p-4 m-1 ${
              open === 0 ? " bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => handle(0)}
          >
            Prerequisites
          </button>
          {open === 0 && (
            <div className="flex justify-center md:hidden">
              <ul className="flex items-start flex-col list-disc py-2 px-7">
                {prerequisites &&
                  prerequisites.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div className="w-[80vw] flex flex-col mt-7 md:w-[30vw]">
          <button
            className={`border border-black p-4 m-1 ${
              open === 1 ? " bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => handle(1)}
          >
            Syllabus
          </button>
          {open === 1 && (
            <div className="flex justify-center md:hidden h-auto">
              <ol className="flex justify-start flex-col">
                {syllabus &&
                  syllabus.map((w, index) => (
                    <li key={index} className="flex p-2">
                      <p className="justify-start w-[30vw]">
                        Week {w.week}
                      </p>
                      <ul className="flex items-start w-[40vw] flex-col list-disc">
                        <li>{w.topic}</li>
                        <li>{w.content}</li>
                      </ul>
                    </li>
                  ))}
              </ol>
            </div>
          )}
        </div>
        <div className="w-[80vw] flex flex-col mt-7 md:w-[30vw]">
          <button
            className={`border border-black p-4 ${
              open === 2 ? " bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => handle(2)}
          >
            Students
          </button>
          {open === 2 && (
            <div className="flex justify-center md:hidden">
              <ol className="flex justify-start flex-col">
                {students &&
                  students.map((s, index) => (
                    <li key={index} className="flex p-2">
                      <p className="justify-start w-[20vw] mt-1">{s.id}</p>
                      <ul className="flex items-start w-[40vw] flex-col">
                        <li>{s.name}</li>
                        <li className="line-clamp-1 overflow-hidden">
                          {s.email}
                        </li>
                      </ul>
                    </li>
                  ))}
              </ol>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block items-center w-[90vw] md:mt-4">
        {open === 0 && (
          <div className="flex justify-center">
            <ul className="flex items-start flex-col list-disc">
              {prerequisites && prerequisites.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        )}
        {open === 1 && (
          <div className="flex justify-center">
            <ol className="flex justify-start flex-col">
              {syllabus &&
                syllabus.map((w, index) => (
                  <li key={index} className="flex justify-center p-2">
                    <p className="justify-start w-[40vw] mt-1">Week {w.week}</p>
                    <ul className="flex items-start w-[40vw] flex-col list-disc">
                      <li>{w.topic}</li>
                      <li>{w.content}</li>
                    </ul>
                  </li>
                ))}
            </ol>
          </div>
        )}
        {open === 2 && (
          <div className="flex justify-center ">
            <ol className="flex justify-start flex-col">
              {students &&
                students.map((s, index) => (
                  <li key={index} className="flex justify-center p-2">
                    <p className="justify-start w-[40vw] mt-1">{s.id}</p>
                    <ul className="flex items-start w-[40vw] flex-col flex-wrap">
                      <li>{s.name}</li>
                      <li>{s.email}</li>
                    </ul>
                  </li>
                ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
