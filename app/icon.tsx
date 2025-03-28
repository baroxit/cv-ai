import { ImageResponse } from 'next/og'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={size.width}
            height={size.height} 
            viewBox="0 0 25 24" 
            fill="none"
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3584 0C9.45047 0 7.83883 1.49878 7.83883 3.42629V20.4103C7.83883 22.3379 9.45048 23.8366 11.3584 23.8366H21.4369C23.3448 23.8366 24.9565 22.3379 24.9565 20.4103V3.42629C24.9565 1.49878 23.3449 0 21.4369 0H11.3584ZM9.83883 3.42629C9.83883 2.6738 10.4832 2 11.3584 2H21.4369C22.3121 2 22.9565 2.6738 22.9565 3.42629V20.4103C22.9565 21.1629 22.3121 21.8366 21.4369 21.8366H11.3584C10.4832 21.8366 9.83883 21.1629 9.83883 20.4103V3.42629ZM4.91935 2.79956C5.47163 2.79956 5.91935 3.24727 5.91935 3.79956V20.597C5.91935 21.1493 5.47163 21.597 4.91935 21.597C4.36706 21.597 3.91935 21.1493 3.91935 20.597V3.79956C3.91935 3.24727 4.36706 2.79956 4.91935 2.79956ZM1 4.47932C1.55228 4.47932 2 4.92704 2 5.47932V17.7974C2 18.3497 1.55228 18.7974 1 18.7974C0.447715 18.7974 0 18.3497 0 17.7974V5.47932C0 4.92704 0.447715 4.47932 1 4.47932Z" fill="#FAFAFA"/>
        </svg>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}