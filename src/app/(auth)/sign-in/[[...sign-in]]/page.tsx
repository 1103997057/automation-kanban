'use client';
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("登录请求：", email, password);
    // TODO: 你可以这里加一个 fetch 请求发送给接口
  };

  return (
    <div>
      <h2>登录 Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>邮箱:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密码:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
}