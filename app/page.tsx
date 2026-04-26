"use client";

import Image from "next/image";
import { useState } from "react";

type Place = {
  title: string;
  description: string;
  images?: string[];
};

type Section = {
  title: string;
  items: Place[];
  map?: {
    title: string;
    src: string;
  };
};

const tabs = [
  { id: "batumi", label: "Батумі" },
  { id: "mestia", label: "Местія" },
] as const;

const batumiMap = {
  title: "Карта Аджарії",
  src: "https://www.google.com/maps/d/u/0/embed?mid=1QeWVdPAfbVMfgmL7FxPBW_zb6jQZDdY&ehbc=2E312F",
};

const batumiSections: Section[] = [
  {
    title: "Що відвідати в Батумі",
    items: [
      {
        title: "Ботанічний сад",
        images: [
          "/Batumi/Botanical Garden/1.jpg",
          "/Batumi/Botanical Garden/2.jpg",
          "/Batumi/Botanical Garden/3.jpg",
          "/Batumi/Botanical Garden/4.jpg",
          "/Batumi/Botanical Garden/5.jpg",
          "/Batumi/Botanical Garden/7.jpeg",
          "/Batumi/Botanical Garden/8.jpg",
        ],
        description:
          "Великий зелений парк над морем із панорамними доріжками, затишними алеями та рідкісними рослинами. Підійде для спокійної прогулянки на пів дня і гарних сімейних фото.",
      },
      {
        title: "Банановий гай",
        images: ["/Batumi/Banana grove/1.jpg"],
        description:
          "Невелика незвична локація з майже тропічним настроєм, куди приємно заїхати заради короткої прогулянки та зміни пейзажу. Цікава саме своєю рідкісною для регіону атмосферою.",
      },
      {
        title: "Петра",
        images: ["/Batumi/Petra Fortress/1.jpg"],
        description:
          "Руїни давньої фортеці на височині з видом на море й околиці. Місце компактне, але дуже атмосферне, особливо якщо хочеться поєднати історію та красиві краєвиди.",
      },
      {
        title: "Храм Самеба",
        images: [
          "/Batumi/Sameba Church/1.jpg",
          "/Batumi/Sameba Church/2.jpg",
        ],
        description:
          "Тихий храмовий комплекс зі спокійною атмосферою та гарним розташуванням. Хороший варіант для неквапливої зупинки й відпочинку від міського ритму.",
      },
      {
        title: "Рибний ринок",
        description:
          "Жваве й колоритне місце, де можна побачити свіжий улов і відчути справжній місцевий побут. Підійде тим, хто любить гастрономічні враження без туристичного глянцю.",
      },
      {
        title: "Національний парк Мтірала",
        images: [
          "/Batumi/Mtirala national park/1.jpg",
          "/Batumi/Mtirala national park/2.jpg",
          "/Batumi/Mtirala national park/3.jpg",
          "/Batumi/Mtirala national park/4.jpg",
          "/Batumi/Mtirala national park/5.jpg",
        ],
        description:
          "Дуже зелений парк із лісом, вологим повітрям, стежками, містками та водоспадами. Один із найкращих варіантів для виїзду на природу, якщо хочеться прохолоди й прогулянки серед гір.",
      },
    ],
  },
  {
    title: "Для малого",
    items: [
      {
        title: "Дельфінарій",
        images: ["/Batumi/Dolphinarium/1.jpg"],
        description:
          "Класичний сімейний варіант, який зазвичай найбільше подобається дітям. Зручно поєднати з прогулянкою набережною та центром Батумі.",
      },
      {
        title: "Парк чудес",
        images: [
          "/Batumi/Wonderland Park/1.webp",
          "/Batumi/Wonderland Park/2.jpeg",
        ],
        description:
          "Простора прогулянкова зона біля моря з оглядовим колесом, відкритими майданчиками та вечірніми вогнями. Хороше місце для легкої прогулянки без складної логістики.",
      },
      {
        title: "Аквапарк",
        images: ["/Batumi/Water Park/1.jpg"],
        description:
          "Скоріше як коротка розвага на кілька годин, ніж обов’язкова точка поїздки. Можна розглядати як запасний варіант, якщо захочеться простого дитячого дозвілля.",
      },
    ],
  },
  {
    title: "Пляжі",
    items: [
      {
        title: "Зелений пляж",
        images: [
          "/Batumi/Green beach/1.jpg",
          "/Batumi/Green beach/2.jpg",
          "/Batumi/Green beach/3.jpg",
          "/Batumi/Green beach/4.jpg",
        ],
        description:
          "Спокійніший пляж із приємним природним оточенням і менш міським настроєм. Підійде для розслабленого дня біля води без зайвої метушні.",
      },
      {
        title: "Пляж Цихісдзірі",
        images: [
          "/Batumi/Tsikhisdziri Beach/1.jpg",
          "/Batumi/Tsikhisdziri Beach/2.jpg",
          "/Batumi/Tsikhisdziri Beach/3.jpg",
          "/Batumi/Tsikhisdziri Beach/4.jpg",
          "/Batumi/Tsikhisdziri Beach/5.jpg",
        ],
        description:
          "Мальовнича ділянка узбережжя поруч із зеленню та скелями, куди їдуть радше за атмосферою, ніж за інфраструктурою. Добре підійде для красивого моря й відчуття усамітнення.",
      },
    ],
  },
];

const mestiaSections: Section[] = [
  {
    title: "Що відвідати у Сванетії",
    map: {
      title: "Карта Сванетії",
      src: "https://www.google.com/maps/d/u/0/embed?mid=1BJJ9LyWLnJ_sBNNEa6-WkfTTAU_Ireo&ehbc=2E312F",
    },
    items: [
      {
        title: "Местія",
        images: [
          "/Svanetia/Mestia/1.jpg",
          "/Svanetia/Mestia/2.jpg",
          "/Svanetia/Mestia/3.jpg",
        ],
        description:
          "Головна база для поїздок Сванетією та зручне місце для проживання. Тут легко поєднувати спокійні прогулянки селищем із виїздами до гір, льодовиків і оглядових точок.",
      },
      {
        title: "Озера Корульді",
        images: [
          "/Svanetia/Koruldi/1.jpg",
          "/Svanetia/Koruldi/2.jpg",
          "/Svanetia/Koruldi/3.jpg",
        ],
        description:
          "Високогірні озера з одним із найвражаючіших краєвидів на сванські вершини. Це місце радше про панорами, простір і відчуття справжніх гір, ніж про неквапливу прогулянку.",
      },
      {
        title: "Громада Ушгулі",
        images: [
          "/Svanetia/Ushguli/1.jpg",
          "/Svanetia/Ushguli/2.jpeg",
          "/Svanetia/Ushguli/3.jpg",
        ],
        description:
          "Відоме сванське поселення з вежами, давньою атмосферою та дуже сильним відчуттям віддаленості від великого світу. Поїздка сюди дає той самий образ Сванетії, який запам’ятовується надовго.",
      },
      {
        title: "Льодовик Чалааді",
        images: [
          "/Svanetia/Chalaadi/1.jpg",
          "/Svanetia/Chalaadi/2.webp",
        ],
        description:
          "Один із найдоступніших маршрутів поруч із Местією, де можна доволі швидко відчути масштаб сванських гір. Стежка не надто довга, а фінальна точка виглядає дуже ефектно.",
      },
      {
        title: "Водоспад Шдугра",
        images: [
          "/Svanetia/Shtudra/1.jpg",
          "/Svanetia/Shtudra/2.jpg",
          "/Svanetia/Shtudra/3.avif",
        ],
        description:
          "Потужний і красивий водоспад, який особливо вражає на тлі суворого гірського ландшафту. Це вже активніша вилазка, але місце вважається одним із найяскравіших у цій місцевості.",
      },
      {
        title: "Канатна дорога",
        images: [
          "/Svanetia/Kanatka/1.jpg",
          "/Svanetia/Kanatka/2.jpeg",
        ],
        description:
          "Простий спосіб швидко піднятися вище й отримати красиві краєвиди без довгого підйому пішки. Хороший варіант для оглядового дня, особливо якщо хочеться гір, але без перевантаження маршрутом.",
      },
    ],
  },
];

function PlaceCard({ place }: { place: Place }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = place.images ?? [];
  const hasImages = images.length > 0;
  const hasSlider = images.length > 1;

  return (
    <article className="rounded-[1.4rem] border border-[color:var(--border)] bg-white/80 p-5 transition-transform duration-300 hover:-translate-y-0.5">
      {hasImages ? (
        <div className="mb-4 overflow-hidden rounded-[1.1rem] border border-[color:var(--border)] bg-[#f4ede2]">
          <div className="relative aspect-[4/3]">
            <Image
              src={images[activeImage]}
              alt={place.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {hasSlider ? (
            <div className="flex items-center justify-between gap-3 border-t border-[color:var(--border)] bg-white/90 px-3 py-2">
              <div className="flex gap-1.5">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`${place.title}: фото ${index + 1}`}
                    onClick={() => setActiveImage(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeImage
                        ? "w-6 bg-[color:var(--foreground)]"
                        : "w-2.5 bg-[color:var(--accent)]/45 hover:bg-[color:var(--accent)]/75"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={`Попереднє фото: ${place.title}`}
                  onClick={() =>
                    setActiveImage((current) =>
                      current === 0 ? images.length - 1 : current - 1,
                    )
                  }
                  className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-semibold text-[color:var(--muted)] transition-colors hover:bg-[color:var(--accent-soft)]"
                >
                  Назад
                </button>
                <span className="min-w-10 text-center text-xs font-medium text-[color:var(--muted)]">
                  {activeImage + 1}/{images.length}
                </span>
                <button
                  type="button"
                  aria-label={`Наступне фото: ${place.title}`}
                  onClick={() =>
                    setActiveImage((current) =>
                      current === images.length - 1 ? 0 : current + 1,
                    )
                  }
                  className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs font-semibold text-[color:var(--muted)] transition-colors hover:bg-[color:var(--accent-soft)]"
                >
                  Далі
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <h3 className="mb-3 text-lg font-semibold text-[color:var(--foreground)]">
        {place.title}
      </h3>
      <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-[0.95rem]">
        {place.description}
      </p>
    </article>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>("batumi");

  const isBatumi = activeTab === "batumi";
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-8 shadow-[0_20px_70px_rgba(100,76,48,0.08)] backdrop-blur sm:px-10 sm:py-10">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-white/70 via-[#f8d7be]/40 to-white/60" />
        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--muted)]">
                Сімейний гід Грузією
              </p>
              <h1 className="font-serif text-5xl leading-none text-[color:var(--foreground)] sm:text-6xl">
                Дві подорожі,
                <br />
                два настрої
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Починаємо з Батумі: спокійні прогулянки, трохи природи, місця для
              сімейних зупинок і пляжі, куди приємно виїхати без поспіху.
            </p>
          </div>

          <div className="flex w-full max-w-md rounded-full border border-[color:var(--border)] bg-white/80 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-all sm:text-base ${
                    isActive
                      ? "bg-[color:var(--foreground)] text-white shadow-[0_12px_30px_rgba(44,36,29,0.18)]"
                      : "text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {isBatumi ? (
        <section className="mt-8 grid gap-6">
          {batumiSections.map((section) => (
            <div
              key={section.title}
              className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-[0_14px_50px_rgba(100,76,48,0.06)] sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="font-serif text-3xl text-[color:var(--foreground)] sm:text-4xl">
                  {section.title}
                </h2>
                <div className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(217,143,92,0.32),transparent)] sm:block" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <PlaceCard key={item.title} place={item} />
                ))}
              </div>

              {section.map ? (
                <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-[color:var(--border)] bg-white/80">
                  <div className="border-b border-[color:var(--border)] px-5 py-3">
                    <h3 className="text-base font-semibold text-[color:var(--foreground)]">
                      {section.map.title}
                    </h3>
                  </div>
                  <iframe
                    src={section.map.src}
                    title={section.map.title}
                    width="100%"
                    height="420"
                    loading="lazy"
                    className="block border-0"
                  />
                </div>
              ) : null}
            </div>
          ))}

          <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-[0_14px_50px_rgba(100,76,48,0.06)] sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-serif text-3xl text-[color:var(--foreground)] sm:text-4xl">
                {batumiMap.title}
              </h2>
              <div className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(217,143,92,0.32),transparent)] sm:block" />
            </div>

            <div className="overflow-hidden rounded-[1.4rem] border border-[color:var(--border)] bg-white/80">
              <iframe
                src={batumiMap.src}
                title={batumiMap.title}
                width="100%"
                height="420"
                loading="lazy"
                className="block border-0"
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-8 grid gap-6">
          {mestiaSections.map((section) => (
            <div
              key={section.title}
              className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-[0_14px_50px_rgba(100,76,48,0.06)] sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="font-serif text-3xl text-[color:var(--foreground)] sm:text-4xl">
                  {section.title}
                </h2>
                <div className="hidden h-px flex-1 bg-[linear-gradient(90deg,rgba(217,143,92,0.32),transparent)] sm:block" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item) => (
                  <PlaceCard key={item.title} place={item} />
                ))}
              </div>

              {section.map ? (
                <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-[color:var(--border)] bg-white/80">
                  <div className="border-b border-[color:var(--border)] px-5 py-3">
                    <h3 className="text-base font-semibold text-[color:var(--foreground)]">
                      {section.map.title}
                    </h3>
                  </div>
                  <iframe
                    src={section.map.src}
                    title={section.map.title}
                    width="100%"
                    height="420"
                    loading="lazy"
                    className="block border-0"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
