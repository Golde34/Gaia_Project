import { Navigate } from "react-router-dom";

export default function BossRoute({ children }) {
  const bossInfo = localStorage.getItem('bossInfo');
  return bossInfo ? children : <Navigate to='/dashboard' />
}