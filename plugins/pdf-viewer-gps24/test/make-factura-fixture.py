"""Test fixture: a supplier invoice with six deliberate defects.

Planted defects (ground truth for the check):
  1. Buyer legal name is the trade name "GPS24 SL", not ELIAN TRADE OU
  2. Buyer VAT EE101588781 — one digit off from EE101588780
  3. DNW-N7-VEO at 169.90; catalogue price is 149.90
  4. BV-DR770X-1CH is an unpublished draft (_-prefixed file), not live on the site
  5. Arithmetic: subtotal + VAT does not equal the printed total
  6. No seller VAT number anywhere on the document
"""
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

W, H = A4
c = canvas.Canvas("factura-test.pdf", pagesize=A4)
y = H - 60


def line(text, size=10, dy=16, font="Helvetica"):
    global y
    c.setFont(font, size)
    c.drawString(50, y, text)
    y -= dy


line("FACTURA  N. 2026-0847", 15, 26, "Helvetica-Bold")
line("Fecha: 04.08.2026        Vencimiento: 18.08.2026")
y -= 8
line("VENDEDOR", 11, 16, "Helvetica-Bold")
line("Naviseade Baltic OU")
line("Parnu mnt 141, Tallinn, Estonia")          # no seller VAT — defect 6
y -= 8
line("COMPRADOR", 11, 16, "Helvetica-Bold")
line("GPS24 SL")                                  # defect 1
line("Benidorm, Alicante, Espana")
line("VAT: EE101588781")                          # defect 2
y -= 14

line("Descripcion                          Cant.   Precio    Total", 10, 18, "Helvetica-Bold")
c.line(50, y + 10, 545, y + 10)
line("DNW-N7-VEO  Diniwid N7 Veo 7\"          10   169.90   1699.00")  # defect 3
line("DNW-N9      Diniwid N9 truck            5   169.90    849.50")
line("BV-DR770X-1CH  BlackVue DR770X 1CH      4   249.90    999.60")   # defect 4
c.line(50, y + 10, 545, y + 10)
y -= 6

line("Subtotal:                                        3548.10")
line("IVA 21%:                                          745.10")
line("TOTAL:                                           4291.00")       # defect 5
y -= 14
line("Forma de pago: transferencia bancaria")
line("IBAN: EE38 2200 2210 2014 5685    Titular: Naviseade Baltic OU")

c.showPage()
c.save()
print("written: factura-test.pdf")
