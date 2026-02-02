import GalleryComponent from "@/components/Gallery/Gallery";

export default function Gallery({setLotusClass, setLotusStyle, setFigureClass, setFigureStyle}) {
  // throw new Error("test crash");

  return (
    <GalleryComponent setLotusClass={setLotusClass} setLotusStyle={setLotusStyle} setFigureClass={setFigureClass} setFigureStyle={setFigureStyle} />
  )
}

