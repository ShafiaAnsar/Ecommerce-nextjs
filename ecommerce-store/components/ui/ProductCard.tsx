'use client'
import Image from "next/image"
import { Product } from "@/types"
import IconButton from "./IconButton"
import { Expand, ShoppingCart } from "lucide-react"
import Currency from "./Currency"
import { useRouter } from "next/navigation"
import { MouseEventHandler } from "react"
import usePreviewModal from "@/hooks/usePreviewModal"
import useCart from "@/hooks/useCart"

interface ProductCardProps{
  data:Product
}
const ProductCard:React.FC<ProductCardProps> = ({data}) => {
  const router = useRouter()
  const previewModal = usePreviewModal()
  const cart = useCart()
  const handleClick = () => {
router.push(`/product/${data?.id}`)
  }
  const onPreview :MouseEventHandler<HTMLButtonElement>= (event)=>{
    event.stopPropagation();
    previewModal.onOpen(data)
  }
  const onAddtoCart :MouseEventHandler<HTMLButtonElement>= (event)=>{
    event.stopPropagation();
    cart.addItem(data)
  }

  return (
    <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 ">
      <div className="aspect-square bg-gray-100 rounded-xl relative">
      <Image 
          src={data?.images?.[0]?.url} 
          alt="" 
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton onClick={onPreview}
            icon={<Expand size={20} className="text-gray-600"/>}
            />
            <IconButton onClick={onAddtoCart}
            icon={<ShoppingCart size={20} className="text-gray-600"/>}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">
          {data.name}
        </p>
        <p className="text-sm text-gray-500">
          {data.category?.name}
        </p>

      </div>
      <div className="flex item-center justify-between ">
        <Currency value={data?.price}/>
      </div>
    </div>
  )
}

export default ProductCard