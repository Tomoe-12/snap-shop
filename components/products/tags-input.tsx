import React, { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";

type TagsInputProps = {
  value: string[];
  handleOnChange: Dispatch<SetStateAction<string[]>>;
};

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ value, handleOnChange, ...props }, ref) => {
    const [tagData, setTagData] = useState("");

    const addNewTags = () => {
      if (tagData) {
        const newTagData = new Set([...value, tagData]);
        handleOnChange(Array.from(newTagData));
        setTagData("");
      }
    };

    return (
      <div>
        <Input
          placeholder="Enter to save"
          value={tagData}
          {...props}
          onChange={(e) => setTagData(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNewTags();
            }
          }}
        />

        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((tag, index) => (
            <div key={index}className="flex items-center gap-1 border-gray-400 border-2 p-1 rounded-md text-xs font-semibold ">
              <span >
                {tag}
              </span>
              <X className="w-4 h-4 cursor-pointer" 
              onClick={()=> handleOnChange(value.filter((_,i)=> i !== index))}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default TagsInput;
