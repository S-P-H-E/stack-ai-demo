import { useState } from "react";
import axios from "axios";
import { BsStars } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";

const endpoint = "https://www.stack-inference.com/run_deployed_flow?flow_id=64c7d73da8f57e2c44512cba&org=6b6cae8f-e4e9-4484-a46d-e179668f1616";
const apiKey = "df170389-072f-486c-a2b2-41dd46b4451c";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputText.trim() === "") return;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const data = {
      "in-0": inputText,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(endpoint, data, { headers });
      setApiResponse(response.data["out-0"]);
    } catch (error) {
      console.error("stack-error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-6">
        <div className="bg-[#2D2D2D] flex justify-center items-center w-fit py-3 px-4 rounded-xl gap-2">
          <BsStars className="text-[#7E7E7E]" />
          <input
            placeholder="Ask me anything"
            className="bg-transparent outline-none w-[350px] placeholder:text-[#939393]"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSubmit}>
            <IoSendSharp className="text-[#E1E1E1]" />
          </button>
        </div>

        {isLoading ? (
          <div className="bg-[#2D2D2D] rounded-xl py-3 px-4 w-[430px]">
            <div className="flex items-center justify-center">
              <div className="animate-bounce mx-1">.</div>
              <div className="animate-bounce mx-1">.</div>
              <div className="animate-bounce mx-1">.</div>
            </div>
          </div>
        ) : (
          <div
            className={`${
              apiResponse ? "bg-[#2D2D2D]" : "hidden"
            } rounded-xl py-3 px-4 w-[430px]`}
          >
            <h1>{apiResponse}</h1>
          </div>
        )}
      </div>
    </div>
  );
}
