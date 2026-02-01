import GalleryComponent from "@/components/Gallery/Gallery";

export default function Gallery({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  return (
    <GalleryComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />
  )
}

