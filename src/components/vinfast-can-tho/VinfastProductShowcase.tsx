import { SeoLink } from "@/components/SeoLink";
import { SeoContentImage } from "@/components/SeoImage";
import {
  formatVnd,
  getCommercialVehicles,
  getPassengerVehicles,
  type VinfastVehicle,
} from "@/lib/content/vinfast-can-tho";
import { getProductById } from "@/lib/content/products";
import { Car, Star, Truck } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Đánh giá ${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm font-bold text-dark ml-1">{rating}/5</span>
    </div>
  );
}

function VehicleReviewCard({ vehicle }: { vehicle: VinfastVehicle }) {
  const productHref = vehicle.seoSlug
    ? `/san-pham/${vehicle.seoSlug}`
    : undefined;
  const seoProduct = vehicle.seoSlug ? getProductById(vehicle.seoSlug) : undefined;
  const displayName = seoProduct?.name ?? `VinFast ${vehicle.name}`;
  const displayDescription = seoProduct?.description ?? vehicle.description;
  const displayImage = seoProduct?.image ?? vehicle.image;
  const displayPrice =
    seoProduct?.price ??
    `${formatVnd(vehicle.listPrice)}`;

  const inner = (
    <>
      <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <SeoContentImage
          src={displayImage}
          alt={`Xe điện ${displayName} tại Cần Thơ`}
          width={800}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
            {displayName}
          </h3>
          <StarRating rating={vehicle.localReview.rating} />
        </div>
        <p className="text-primary-dark font-bold mb-3">
          {displayPrice}
        </p>
        <p className="text-xs font-semibold text-secondary-dark uppercase tracking-wider mb-2">
          {vehicle.localReview.useCase}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          {displayDescription}
        </p>
        <blockquote className="border-l-4 border-secondary pl-3 text-sm text-gray-700 italic">
          {vehicle.localReview.verdict}
        </blockquote>
      </div>
    </>
  );

  if (productHref) {
    return (
      <SeoLink
        href={productHref}
        className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-secondary/30 transition-all"
      >
        {inner}
      </SeoLink>
    );
  }

  return (
    <article className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-secondary/30 transition-all">
      {inner}
    </article>
  );
}

function VehicleGroup({
  title,
  icon: Icon,
  vehicles,
}: {
  title: string;
  icon: typeof Car;
  vehicles: VinfastVehicle[];
}) {
  return (
    <div>
      <p className="flex items-center gap-3 text-lg font-bold text-primary-dark mb-6">
        <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </span>
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleReviewCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}

export function VinfastProductShowcase() {
  return (
    <div className="space-y-12">
      <VehicleGroup
        title="Xe du lịch — VF3 nhỏ gọn đô thị, VF5 chạy dịch vụ..."
        icon={Car}
        vehicles={getPassengerVehicles()}
      />
      <VehicleGroup
        title="Xe thương mại xanh — Logistics nội đô, vận tải liên tỉnh Miền Tây"
        icon={Truck}
        vehicles={getCommercialVehicles()}
      />
    </div>
  );
}
