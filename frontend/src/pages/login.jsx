import AuthPage from '@/components/AuthPage/Authpage'
export default function login({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return (
    <div><AuthPage setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} /></div>
  )
}
