import Image from 'next/image'

export function TransparentLoader({ size = 100 }: { size?: number }) {
  return (
<div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-brown-500/50">
<div className="relative" style={{ width: size, height: size }}>
        <Image
          src="/images/llama-gif.gif"
          alt="Loading"
          layout="fill"
        //   className="animate-spin"
        />
      </div>
    </div>
  )
}