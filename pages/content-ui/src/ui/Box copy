import React from 'react';
import type { ActionGetResponse } from '../types/Action.type';

interface BoxProps {
  data: ActionGetResponse;
}

const Box: React.FC<BoxProps> = ({ data }) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1 ring-2 ring-blue-500">
      <img
        src={data.icon}
        alt={data.title}
        className="aspect-square bg-muted rounded-md overflow-hidden w-full max-w-full object-center"
      />
      <h2 className="my-4">{data.title}</h2>
      <p className="my-4">{data.description}</p>
      <div className="flex justify-between mb-4">
        <button className="btn">Button 1</button>
        <button className="btn">Button 2</button>
        <button className="btn">Button 3</button>
      </div>
      <div className="flex items-center">
        <input type="text" placeholder="Enter text" className="flex-1 mr-2" />
        <button className="btn">Submit</button>
      </div>
    </div>
  );
};

export default Box;
