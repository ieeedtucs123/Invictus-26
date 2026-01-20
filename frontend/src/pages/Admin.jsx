import Admin from '@/components//AdminDashboard/Admin';

export default function AdminPage({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle }) {
  return <Admin setLotuClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />;
}