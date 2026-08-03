output "instance_id" {
  value = aws_instance.dms_server.id
}

output "public_ip" {
  value = aws_instance.dms_server.public_ip
}

output "security_group_id" {
  value = aws_security_group.dms_sg.id
}