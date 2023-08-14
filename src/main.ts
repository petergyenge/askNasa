import "./style.css";
import nasaApi/* ,{AxiosError, AxiosResponse} */ from "axios";
import { z } from "zod";

/* https://api.nasa.gov/planetary/apod?api_key=agJ4RiUMnTdtLXjD89PG084vSK89goRLAd971PKd */
const exp = document.getElementById("explanation") as HTMLParagraphElement
const tit = document.getElementById("title") as HTMLParagraphElement
const imageDiv = document.getElementById("imageDiv") as HTMLDivElement
const dateInput = document.getElementById("date") as HTMLInputElement




const ResponseSchema = z.object({
  date: z.string(),
  explanation: z.string(),
  url: z.string(),
  title: z.string(),
});




type Response = z.infer<typeof ResponseSchema> | null;

const renderData = (data: Response) =>{
  exp.innerHTML = data!.explanation
  tit.innerHTML = data!.title
  imageDiv.innerHTML = `<img src="${data!.url}">`
  dateInput.innerHTML = `<input type="date" id="dateInput">`
  console.log(dateInput.value)

}

let apiURL = `https://api.nasa.gov/planetary/apod?date=2023-04-01&api_key=agJ4RiUMnTdtLXjD89PG084vSK89goRLAd971PKd`

const getData = async (apiURL: string): Promise<Response | null> => {
  const response = await nasaApi.get(apiURL);
  const data = response.data;
  const result = ResponseSchema.safeParse(data);

  if (!result.success) {
    return null;
  }
  renderData(data)
  return data
};

dateInput.addEventListener("change", () =>{
  getData(apiURL)
})