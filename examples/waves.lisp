(size 200 200)
(set y 50)
(rep 6
  (seq
    (set y (mul (get y) 1.4))
    (l (get y))
    (rep 28
      (fill (get @TINTCOLOR)
        (rect
          (mul 15 (sub $ 1))
          (sub (get y) 53)
          10
          (mul 0.2 (get y) (sin $))
        )
      )
    )
  )
)