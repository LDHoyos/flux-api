import torch
from diffusers import FluxPipeline
from PIL import Image
import sys

prompt = sys.argv[1]

pipe = FluxPipeline.from_pretrained(
    "black-forest-labs/FLUX.1-dev",
    torch_dtype=torch.float16
)
pipe.to("cuda" if torch.cuda.is_available() else "cpu")

image = pipe(
    prompt=prompt,
    height=1024,
    width=1024,
    guidance_scale=3.5,
    num_inference_steps=50,
    max_sequence_length=512,
    generator=torch.Generator().manual_seed(0)
).images[0]

image.save("output.png")
