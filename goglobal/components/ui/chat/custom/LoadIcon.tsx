import Image from 'next/image'

export function TransparentLoader({ size = 100 }: { size?: number }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="relative" style={{ width: size, height: size }}>
        <Image
          src="/placeholder.svg?height=100&width=100"
          alt="Loading"
          layout="fill"
          className="animate-spin"
        />
      </div>
    </div>
  )
}