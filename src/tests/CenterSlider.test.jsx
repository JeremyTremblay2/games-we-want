import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import CenterSlider from "../components/CenterSlider"

describe("CenterSlider", () => {
  test("renders the images", () => {
    const images = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]

    render(
      <BrowserRouter>
        <CenterSlider>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`image-${index}`} />
          ))}
        </CenterSlider>
      </BrowserRouter>
    )

    const image1 = screen.getAllByAltText("image-0")[0]
    const image2 = screen.getAllByAltText("image-1")[0]
    expect(image1).toBeInTheDocument()
    expect(image1).toHaveAttribute("src", "https://example.com/image1.jpg")
    expect(image2).toBeInTheDocument()
    expect(image2).toHaveAttribute("src", "https://example.com/image2.jpg")
  })
})
