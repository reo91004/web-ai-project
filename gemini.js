import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import apiKey from "./key.js";

// API 키
const API_KEY = apiKey;
const genAI = new GoogleGenerativeAI(API_KEY);

// Gemini 핵심 코드
async function getGemini(promptInput) {
  const loadingIndicator = document.getElementById("loadingIndicator");
  const outputDiv = document.getElementById("output");

  // 함수가 실행되면 display 보이도록 변경
  loadingIndicator.style.display = "block";
  outputDiv.innerHTML = "";

  // 모델 선택
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "안녕, 이제부터 너는 내 도우미야. " + promptInput;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  loadingIndicator.style.display = "none";
  displayResult(text);
}

function displayResult(result) {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = result;
}

// 버튼 클릭 시, getGemini() 실행
document.getElementById("generateButton").addEventListener("click", () => {
  const promptInput = document.getElementById("promptInput").value;
  getGemini(promptInput);
});
